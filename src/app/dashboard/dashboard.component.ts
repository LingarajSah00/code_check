import { Component,OnInit, AfterViewInit, ViewChild, Inject, ElementRef, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';  // Correct import for feature modules
import { isPlatformBrowser } from '@angular/common';

// Angular Material modules
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController, LineController, LineElement, PointElement, Filler, BarElement, BarController } from 'chart.js';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { PiechatComponent } from '../piechat/piechat.component';
import { filter } from 'rxjs/operators';
import { RolepermissionserviceService } from '../service/rolepermissionservice.service';

// Explicitly register the necessary components for Chart.js
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController, LineController, LineElement, PointElement, Filler, BarElement, BarController);

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Fixed typo here
})
export class DashboardComponent implements AfterViewInit {
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
      this.isSidebarOpened = true;  // Sidebar starts collapsed on desktop too
    }
  }
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
    this.sidenav.toggle();

  }
  // Canvas references
  @ViewChild('completionRateCanvas') completionRateCanvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('userComplianceCanvas') userComplianceCanvas: ElementRef<HTMLCanvasElement> | undefined;

  constructor(private rolePermissionService: RolepermissionserviceService,@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

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

  canCreateUser(): boolean {
    // Retrieve the current user's role information from localStorage
    const currentUser = localStorage.getItem('currentUserRole');
  
    // Check if we have a valid currentUser and if they have permission to delete
    if (currentUser) {
      // Parse the string back to an object
      const parsedUser = JSON.parse(currentUser);
  
      // Call the rolePermissionService to check if the user has the delete permission
      return this.rolePermissionService.hasPermission(parsedUser, 'createUser');
    }
  
    return false;  // Return false if no user is found in localStorage
  }
}
