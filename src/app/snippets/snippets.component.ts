import { Component ,ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';  // For pagination
import { MatTableDataSource } from '@angular/material/table'; // For working with data source
import { MatSort } from '@angular/material/sort';  // Optional: For sorting
import { CreateCampaignComponent } from '../create-campaign/create-campaign.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EdituserdialogComponent } from '../edituserdialog/edituserdialog.component';
import { EditcampaignsdialogComponent } from '../editcampaignsdialog/editcampaignsdialog.component';
import { RolepermissionserviceService } from '../service/rolepermissionservice.service';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { DownloaddialogComponent } from '../downloaddialog/downloaddialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CampaignService } from '../service/campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { CampaignDetailsDialogComponent } from '../campaign-details-dialog/campaign-details-dialog.component';

interface UserData {
  id: number;
  name: string;
  description: string;
  type: String;
  status: string;
  template: string;
}
@Component({
  selector: 'app-snippets',
  imports: [HttpClientModule,MatTooltipModule,CommonModule, MatTableModule  ,   // Import MatTableModule for Angular Material Table
    MatButtonModule,  // Optional: To add buttons or actions
    MatIconModule,     // Optional: For adding icons (e.g., edit, delete)
    MatPaginatorModule, // For pag
    MatInputModule],
    providers: [CampaignService],  // Provide UserService here explicitlyination

  templateUrl: './snippets.component.html',
  styleUrl: './snippets.component.css'
})
export class SnippetsComponent {
  constructor( private campaignService: CampaignService,private rolePermissionService: RolepermissionserviceService,public dialog: MatDialog, private _snackBar: MatSnackBar) {}
  
// Paginator reference to connect to the mat-paginator in the template
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // This is used for sorting (optional, if needed)
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [ 'name', 'type','description','template', 'status','actions']; // Define table column names
  dataSource = new MatTableDataSource<UserData>([
    { id: 1, name: 'campaign1', type:'Course1' ,description:'couse details',template:'Template1',status: 'ACTIVE' },
    { id: 2, name: 'campaign1', type:'Course1' ,description:'couse details',template:'Template1',status: 'ACTIVE' },
    { id: 3, name: 'campaign1', type:'Course1' ,description:'couse details',template:'Template1',status: 'ACTIVE' },
    { id: 4, name: 'campaign1', type:'Course1' ,description:'couse details',template:'Template1',status: 'ACTIVE' },
    { id: 5, name: 'campaign1', type:'Course1' ,description:'couse details',template:'Template1',status: 'ACTIVE' },
  ]);


openCampaignDetailsDialog(campaign: any): void {
  this.dialog.open(CampaignDetailsDialogComponent, {
    width: '400px',
    data: campaign
  });
}

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateCampaignComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Open the confirmation dialog after user fills in the form
        this.openConfirmationDialog(result);
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
      // If confirmed, handle form submission
      this.onSubmit(userData);  // Submit user data
    }
  });

  
}

// Handle form submission
onSubmit(userData: any): void {
  // Logic to add the new user to the table or save to server
  const newUser: UserData = {
    id: this.dataSource.data.length + 1,
    name: userData.name,
    type: userData.type,
    description: userData.description,
    status: userData.status,
    template: userData.template
  };

  // Add the new user to the table
  this.dataSource.data = [...this.dataSource.data, newUser];
  this._snackBar.open('User created successfully!', 'Close', { duration: 2000 });

  //  // Call the API to create the campaign
  //  this.campaignService.createCampaign(userData).subscribe(
  //   (response) => {
  //     // Successfully created campaign
  //     this.dataSource.data = [...this.dataSource.data, response]; // Update the table with the new campaign
  //     this._snackBar.open('Campaign created successfully!', 'Close', { duration: 2000 });
  //   },
  //   (error) => {
  //     // Handle error
  //     this._snackBar.open('Error creating campaign!', 'Close', { duration: 2000 });
  //   }
  // );
}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  // Optional: Enable sorting by columns
  }

  // Filter the table based on the input search text
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openEditUserDialog(user: UserData): void {
    const dialogRef = this.dialog.open(EditcampaignsdialogComponent, {
      width: '400px',
      data: { status: user.status }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) { // Check if user has made a change
        // Open the confirmation dialog before submitting
        const confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '300px',
          data: {
            message: `Are you sure you want to submit the changes for ${user.name}?`
          }
        });
  
        confirmDialogRef.afterClosed().subscribe(confirmResult => {
          if (confirmResult) {
            // If confirmed, update the user status
            user.status = result;

            //  // Call the API to update the campaign
            //  this.campaignService.editCampaign(user).subscribe(
            //   (updatedCampaign) => {
            //     // Update the table with the new values
            //     const index = this.dataSource.data.findIndex(campaign => campaign.id === updatedCampaign.id);
            //     if (index > -1) {
            //       this.dataSource.data[index] = updatedCampaign; // Update the campaign in the table
            //       this.dataSource._updateChangeSubscription(); // Refresh the table view
            //       this._snackBar.open('Campaign updated successfully!', 'Close', { duration: 2000 });
            //     }
            //   },
            //   (error) => {
            //     // Handle error
            //     this._snackBar.open('Error updating campaign!', 'Close', { duration: 2000 });
            //   }
            // );
            this.dataSource._updateChangeSubscription(); // Refresh the table
            this._snackBar.open(`User status updated to ${user.status}`, 'Close', { duration: 3000 });
          } else {
            // If canceled, revert changes or do nothing
            console.log(`Edit for ${user.name} was canceled.`);
          }
        });
      }
    });
  }

  deleteRecord(element: UserData): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the record for ${element.name}?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion if confirmed
        const index = this.dataSource.data.indexOf(element);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);  // Remove the record from the dataSource
          this.dataSource._updateChangeSubscription();  // Refresh table view
          this._snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
        }

        //  // Proceed with deletion if confirmed
        //  this.campaignService.deleteCampaign(element.id).subscribe(
        //   () => {
        //     // If deletion is successful, remove the record from the table
        //     const index = this.dataSource.data.indexOf(element);
        //     if (index > -1) {
        //       this.dataSource.data.splice(index, 1);  // Remove the record from the dataSource
        //       this.dataSource._updateChangeSubscription();  // Refresh table view
        //       this._snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
        //     }
        //   },
        //   (error) => {
        //     // Handle error if the delete fails
        //     this._snackBar.open('Error deleting record!', 'Close', { duration: 3000 });
        //   }
        // );
      } else {
        console.log('Deletion canceled');
      }
    });
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
  canCreateUserForTemp(): boolean {
    // Retrieve the current user's role information from localStorage
    const currentUser = localStorage.getItem('currentUserRole');
  
    // Check if we have a valid currentUser and if they have permission to delete
    if (currentUser) {
      // Parse the string back to an object
      const parsedUser = JSON.parse(currentUser);
  
      // Call the rolePermissionService to check if the user has the delete permission
      return this.rolePermissionService.hasPermission(parsedUser, 'createUserForTemp');
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


    // Open the download dialog
    openDownloadDialog(): void {
      const dialogRef = this.dialog.open(DownloaddialogComponent, {
        width: '300px', // Adjust the width as needed
      });
  
      // Handle the dialog close event to determine download type
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.downloadData(result); // Pass the selected format to download the data
        }
      });
    }
  
    // Handle downloading data based on selected format
    downloadData(format: string): void {
      const data = this.dataSource.data; // Get data from the table
  
      if (format === 'csv') {
        this.downloadCSV(data);
      } else if (format === 'excel') {
        this.downloadExcel(data);
      }
    }
  
    // Download the data as CSV
    downloadCSV(data: any[]): void {
      const csvData = this.convertToCSV(data);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'campaigns.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  
    // Convert the data to CSV format
    convertToCSV(data: any[]): string {
      const header = Object.keys(data[0]);
      const rows = data.map((row) =>
        header.map((field) => `"${row[field]}"`).join(',')
      );
      return [header.join(','), ...rows].join('\n');
    }
  
    // Download the data as Excel (using a simple export approach)
    downloadExcel(data: any[]): void {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Templates');
      XLSX.writeFile(workbook, 'campaigns.xlsx');
    }
}
