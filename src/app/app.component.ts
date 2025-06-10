import { Component ,ViewChild,OnInit,AfterViewInit,Inject,ElementRef,PLATFORM_ID} from '@angular/core';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenu } from '@angular/material/menu';  // Import MatMenu to use ViewChild
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd,Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Assuming you have the AuthGuard
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController, LineController, LineElement, PointElement, Filler, BarElement, BarController } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController, LineController, LineElement, PointElement, Filler, BarElement, BarController);
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,  // Common directives like NgIf, NgFor
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    RouterModule,
    CKEditorModule,
    HttpClientModule
  ],
  standalone: true,  // Declare DashboardComponent as standalone

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  
  constructor(public router: Router, private authService: AuthService,@Inject(PLATFORM_ID) private platformId: Object) {
    // Redirect to login if the user is not authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

 @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidebarOpened = true;  // Whether the sidebar is open or not
  isLoggedIn: boolean = false;  // Track login state
  isDashboardRoute: boolean = false;

  ngOnInit(): void {
    // Listen for router navigation changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if the current route is "/dashboard"
      this.isDashboardRoute = this.router.url === '/dashboard';
    });
  }
  private updateDashboardRoute(): void {
    const currentRoute = this.router.url;
    this.isDashboardRoute = currentRoute === '/dashboard'; // Adjust the route path as needed
  }
  updateSidebarState() {
    // Check if it's a mobile or desktop view
    const isMobileView = window.innerWidth < 768;
    if (isMobileView) {
      this.isSidebarOpened = false;  // Sidebar starts collapsed on mobile
    } else {
      this.isSidebarOpened = false;  // Sidebar starts collapsed on desktop too
    }
  }
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
    this.sidenav.toggle();

  }
  // Canvas references
  @ViewChild('completionRateCanvas') completionRateCanvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('userComplianceCanvas') userComplianceCanvas: ElementRef<HTMLCanvasElement> | undefined;


  logout() {
    // Remove the token from localStorage to log out
    localStorage.removeItem('authToken');
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSidebarState();

      // Check if the canvas elements are available and create charts
      if (this.completionRateCanvas?.nativeElement && this.userComplianceCanvas?.nativeElement) {
        this.createCharts();
      } else {
        console.error('Canvas elements not available');
      }
    }
  }

  createCharts() {
    // Destroy any existing charts (if any) to prevent multiple instances
    if (this.completionRateCanvas?.nativeElement) {
      new Chart(this.completionRateCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Completed', 'Pending', 'InProgress'],
          datasets: [{
            data: [40, 30, 30],
            backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }

    if (this.userComplianceCanvas?.nativeElement) {
      new Chart(this.userComplianceCanvas.nativeElement, {
        type: 'line', // Line chart with area
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Expanded months
          datasets: [
            {
              label: 'Compliant Users',
              data: [40, 45, 50, 60, 75, 90, 80, 70, 65, 80, 95, 100], // Example data for compliant users
              fill: true, // Fill the area beneath the line
              borderColor: '#2196f3', // Line color
              backgroundColor: 'rgba(33, 150, 243, 0.2)', // Area color
              tension: 0.4, // Smooth the line
              borderWidth: 2
            },
            {
              label: 'Non-Compliant Users',
              data: [60, 50, 45, 40, 35, 25, 30, 40, 50, 35, 25, 20], // Example data for non-compliant users
              fill: true, // Fill the area beneath the line
              borderColor: '#ff9800', // Line color
              backgroundColor: 'rgba(255, 152, 0, 0.2)', // Area color
              tension: 0.4, // Smooth the line
              borderWidth: 2
            },
            {
              label: 'Pending Users',
              data: [10, 15, 10, 10, 5, 10, 20, 15, 15, 10, 5, 5], // Example data for pending users
              fill: true, // Fill the area beneath the line
              borderColor: '#4caf50', // Line color
              backgroundColor: 'rgba(76, 175, 80, 0.2)', // Area color
              tension: 0.4, // Smooth the line
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Users'
              },
              stacked: true, // Stack the datasets
            }
          }
        }
      });
    }
  }

}
