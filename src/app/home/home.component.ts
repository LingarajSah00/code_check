import { Component,OnInit, AfterViewInit, ViewChild, Inject, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController, LineController, LineElement, PointElement, Filler, BarElement, BarController } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController, LineController, LineElement, PointElement, Filler, BarElement, BarController);

@Component({
  selector: 'app-home',
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
        MatExpansionModule  ],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  today: string = '';

  ngOnInit(): void {
    // Get the current date formatted using DatePipe
    const currentDate = new Date();
    this.today = this.datePipe.transform(currentDate, 'fullDate')!;
  }
  getStatusIcon(status: string): string {
    switch (status) {
      case 'Completed':
        return 'check_circle';
      case 'Loading':
        return 'settings';
      case 'InCompleted':
        return 'warning';
      case 'Failed':
      default:
        return 'error';
    }
  }
  
  displayedColumns: string[] = ['campaign', 'status', 'progress'];
  dataSource = [
    { campaign: 'STATUS of NIGHTLY LOAD', status: 'Completed', progress: '2025-01-23 11:07:28' },
    { campaign: 'Compliance Training Due Notification', status: 'InCompleted', progress: '2025-01-23 11:07:28' },
    { campaign: 'Compliance Notification Process', status: 'Loading', progress: '2025-01-23 11:07:28' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router,private datePipe: DatePipe) {}
  get allCompleted(): boolean {
    return this.dataSource.every(item => item.status === 'Completed');
  }
  // Canvas references
  @ViewChild('completionRateCanvas') completionRateCanvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('userComplianceCanvas') userComplianceCanvas: ElementRef<HTMLCanvasElement> | undefined;

    ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        //this.updateSidebarState();
  
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
