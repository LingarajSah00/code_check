import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';  // Import MatTabsModule for tabs
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';  // Import the MatDatepicker module
import { MatNativeDateModule } from '@angular/material/core';  // Import the native date module
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Run {
  id: number;
  email: string;
  audience: string;
  campaigns: string;
  dateRun: Date;
  notificationType: string;

}

interface FormData {
  adminEmail: string;
  targetAudience: string[];
  targetAudienceAll: boolean;
  campaigns: string[];
  campaignsAll: boolean;
  learnerCount: number;
  message: string;
  inProgress?: boolean; // Add the inProgress flag to track status

}

import { MatSelectModule } from '@angular/material/select';

import { MatOptionModule } from '@angular/material/core';
import { ManualrundialogcomponentComponent } from '../manualrundialogcomponent/manualrundialogcomponent.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PreviewdialogComponent } from '../previewdialog/previewdialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RolepermissionserviceService } from '../service/rolepermissionservice.service';
import { ManualrunService } from '../service/manualrun.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-manualrun',
  imports: [HttpClientModule,MatTooltipModule,MatPaginatorModule,MatTabsModule,FormsModule,MatInputModule,CommonModule,MatFormFieldModule,MatSelectModule,MatOptionModule
    , MatDatepickerModule,  // Import MatDatepicker module
    MatNativeDateModule,MatCheckboxModule,MatTableModule,MatButtonModule,FormsModule,CommonModule,MatIconModule
  ],
           providers: [ManualrunService], 
  
  templateUrl: './manualrun.component.html',
  styleUrl: './manualrun.component.css'
})
export class ManualrunComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  countdown: number = 20;  // 30 minutes in seconds
  timerInterval: any;
  showTimer: boolean = true;  // Show the timer by default

  displayedColumns: string[] = ['id', 'email', 'audience', 'campaigns', 'notificationType','dateRun'];
  dataSource = new MatTableDataSource<Run>([
    { id: 1, email: 'user1@example.com', audience: 'Audience 1', campaigns: 'Campaign 1', dateRun: new Date() ,notificationType: 'System'},
    { id: 2, email: 'user2@example.com', audience: 'Audience 2', campaigns: 'Campaign 2', dateRun: new Date() ,notificationType:'Manual',},
    { id: 3, email: 'user3@example.com', audience: 'Audience 3', campaigns: 'Campaign 3', dateRun: new Date() ,notificationType:'Manual',},
  ]);
  submittedData: MatTableDataSource<FormData> = new MatTableDataSource<FormData>([]);  // Use MatTableDataSource for dynamic updates

  emailList: string[] = [
    'ComplianceTraining@CVSHealth.com',
    'David.Falkowski@CVSHealth.com',
    'Ryan@CVSHealth.com',
  ];
 // Define the model to store form values
 formData = {
  adminEmail: '',
  targetAudience: []as string[],  // For multiple select options
  targetAudienceAll: false,  // Checkbox for 'All'
  campaigns: []as string[],  // For multiple select options
  campaignsAll: false,  // Checkbox for 'All'
  learnerCount: 5000 , // Checkbox for 'Test Run'
  message: '', // Default message
  inProgress: false, // Default to false
};


   

  searchText: string = ''; // To store search text
  filteredData: Run[] = []; // Filtered data based on search text

  constructor(private manualrunService:ManualrunService, private rolePermissionService: RolepermissionserviceService,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.startTimer();
    this.formData.adminEmail = this.emailList[0];  // Default to the first email in the list
    this.submittedData.paginator = this.paginator;

  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);  // Clear the timer when the component is destroyed
    }
  }
  // Filter data based on search text
  ngOnChanges() {
    this.filteredData = this.dataSource.data.filter((item) => 
      item.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.campaigns.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; // Decrement time by one second
      } else {
        clearInterval(this.timerInterval); // Stop the timer once it reaches 0
        this.showTimer = false; // Hide the timer once it reaches

        this.updateStatusToInProgress();

      }
    }, 1000);
  }
  updateStatusToInProgress() {
    this.submittedData.data.forEach((element) => {

      if (!element.inProgress) {
        element.inProgress = true; // Mark as In Progress
      }

      // Call the POST API via the service
      this.manualrunService.postData(this.formData).subscribe(
        (response) => {
          console.log('API call successful:', response);
          
          // Handle the success response from the API
          this.openConfirmationDialog(response); // Show the confirmation dialog with response data (optional)
        },
        (error) => {
          console.error('API call failed:', error);
          // Handle the error response (e.g., show an error message to the user)
          //alert('Something went wrong! Please try again.');
        }
      );
    });
    this.submittedData._updateChangeSubscription(); // Manually trigger table update
  }
  
  get timeLeft() {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
  }

  padTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
  // Create Run button handler
  createRun() {
    const dialogRef = this.dialog.open(ManualrundialogcomponentComponent, {
      width: '1100px', // Set a fixed width (you can adjust this value)
      height: '500px', // Set a fixed height (you can adjust this value)
      maxWidth: 'none',   // Allow the dialog to take up 100% of the screen width
      data: { /* Pass the data for the form if needed */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.showConfirmationDialog();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
// Optionally, handle 'Enter' key press
onEnter(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    this.onClick(); // Trigger submit when Enter is pressed
  }
}
 // Open the Preview Dialog when user clicks Submit
 onClick(): void {
  console.log('Form Data:', this.formData);

  // Prepare the data to pass to the dialog
  const dialogRef = this.dialog.open(PreviewdialogComponent, {
    width: '1300px', // Set a fixed width (you can adjust this value)
      height: '800px', // Set a fixed height (you can adjust this value)
      maxWidth: 'none', // Adjust width as needed
    data: this.formData  // Pass the formData to the dialog component

  });
 

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Handle submission logic here (e.g., save to the server)
      //this.submitData();
      //this.submittedData = this.formData;  // Store the data in submittedData

      this.openConfirmationDialog(result);

    }
  });
}

 // Handle checkbox selection for "All" Audience and Campaigns
 toggleAll(target: string): void {
  if (target === 'audience') {
    // If "All" is checked for audience, set targetAudience to ['All'], otherwise reset to empty array
    this.formData.targetAudience = this.formData.targetAudience.includes('All') ? [] : ['All'];
  } else if (target === 'campaigns') {
    // If "All" is checked for campaigns, set campaigns to ['All'], otherwise reset to empty array
    this.formData.campaigns = this.formData.campaigns.includes('All') ? [] : ['All'];
  }
}

  // Open Confirmation Dialog when user clicks Submit
  openConfirmationDialog1(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

   
      }
    });
  
    
  }
     // Open Confirmation Dialog when user clicks Submit
      openConfirmationDialog(userData: any): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '300px'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
    
            this.submittedData.data.push({ ...this.formData });
            this.submittedData._updateChangeSubscription();  // Manually trigger update for MatTableDataSource

        // Reset the form after submission
        this.resetForm();
          }
        });
      
        
      }


  // Reset form fields to their initial values
  resetForm(): void {
    this.formData = {
      adminEmail: '',
      targetAudience: [],
      targetAudienceAll: false,
      campaigns: [],
      campaignsAll: false,
      learnerCount: 5000,
      message : '',
      inProgress: false
    };

    // Optionally, reset the search text as well
    this.searchText = '';
  }
      onSubmit(userData: any): void {
        // Logic to add the new user to the table or save to server
        const newUser: Run = {
          id: this.dataSource.data.length + 1,
          audience: userData.audience,
          email: userData.email,
          campaigns: userData.campaigns,
          notificationType: userData.notificationType,
          dateRun: userData.dateRun
        };
      }
      toggleMessage(element: any): void {
        element.expanded = !element.expanded;
      }
      


  canDeleteUser(): boolean {
    // Retrieve the current user's role information from localStorage
    const currentUser = localStorage.getItem('currentUserRole');
  
    // Check if we have a valid currentUser and if they have permission to delete
    if (currentUser) {
      // Parse the string back to an object
      const parsedUser = JSON.parse(currentUser);
  
      // Call the rolePermissionService to check if the user has the delete permission
      return this.rolePermissionService.hasPermission(parsedUser, 'deleteUser');
    }
  
    return false;  // Return false if no user is found in localStorage
  }

  canEditUser(): boolean {
    // Retrieve the current user's role information from localStorage
    const currentUser = localStorage.getItem('currentUserRole');
  
    // Check if we have a valid currentUser and if they have permission to delete
    if (currentUser) {
      // Parse the string back to an object
      const parsedUser = JSON.parse(currentUser);
  
      // Call the rolePermissionService to check if the user has the delete permission
      return this.rolePermissionService.hasPermission(parsedUser, 'editUser');
    }
  
    return false;  // Return false if no user is found in localStorage
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

  canViewUser(): boolean {
    // Retrieve the current user's role information from localStorage
    const currentUser = localStorage.getItem('currentUserRole');
  
    // Check if we have a valid currentUser and if they have permission to delete
    if (currentUser) {
      // Parse the string back to an object
      const parsedUser = JSON.parse(currentUser);
  
      // Call the rolePermissionService to check if the user has the delete permission
      return this.rolePermissionService.hasPermission(parsedUser, 'viewUser');
    }
  
    return false;  // Return false if no user is found in localStorage
  }
}
