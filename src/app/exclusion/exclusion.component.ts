import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateMaintenanceDialogComponent } from '../create-maintenance-dialog/create-maintenance-dialog.component';
import { EdituserdialogComponent } from '../edituserdialog/edituserdialog.component';
import { NotificationService } from '../service/notification.service';
import { ELTData } from '../model/elt.model';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DownloaddialogComponent } from '../downloaddialog/downloaddialog.component';
import * as XLSX from 'xlsx';
import { RolepermissionserviceService } from '../service/rolepermissionservice.service';
import { ExclusionService } from '../service/exclusion.service';


@Component({
    selector: 'app-exclusion',
    imports: [MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        FormsModule, HttpClientModule,MatSelectModule,MatTooltipModule,CommonModule],
    providers: [NotificationService,ExclusionService],
    templateUrl: './exclusion.component.html',
    styleUrl: './exclusion.component.css'
})
export class ExclusionComponent {
    defaultOption: string = 'option1';
    constructor(private exclusionService : ExclusionService,private rolePermissionService: RolepermissionserviceService,private notificationService: NotificationService,
        public dialog: MatDialog, private _snackBar: MatSnackBar) { }


        @ViewChild('paginator1') paginator1!: MatPaginator;
        @ViewChild('paginator2') paginator2!: MatPaginator;
        @ViewChild('paginator3') paginator3!: MatPaginator;
          @ViewChild(MatSort) sort!: MatSort;

    loading: boolean = false;

    selectedOption: string = 'option1';

    displayedColumns: string[] = ['id', 'fullName', 'actions'];
  
    // Different data sources for each table
    dataSource1 = new MatTableDataSource<ELTData>([
      { id: 1, fullName: 'Paul Russo', username: '3232', userTitle: 'EVP and Chief Medical Officer', adminFullName: 'Nancy Gelinas', adminId: '0022874', personExceptionStatus: 'Active', nmUpdate: '3234234', dtUpdate: '', updatedByFullName: '', adminUsername: '', adminEmail: '', receiveDirectReportNotifications: '', blockAllNotifications: '' ,nmCreate:'',dtCreate:''},
      { id: 2, fullName: 'John Doe', username: 'jdoe', userTitle: 'Manager', adminFullName: 'Jane Smith', adminId: '004500', personExceptionStatus: 'Inactive', nmUpdate: 'admin', dtUpdate: '2025-03-06', updatedByFullName: 'John Smith', adminUsername: '', adminEmail: '', receiveDirectReportNotifications: '', blockAllNotifications: '' ,nmCreate:'',dtCreate:''},
    ]);
  
    dataSource2 = new MatTableDataSource<ELTData>([
        { id: 1, fullName: 'Paul Russo1', username: '3232', userTitle: 'EVP and Chief Medical Officer', adminFullName: 'Nancy Gelinas', adminId: '0022874', personExceptionStatus: 'Active', nmUpdate: '3234234', dtUpdate: '', updatedByFullName: '', adminUsername: '', adminEmail: '', receiveDirectReportNotifications: '', blockAllNotifications: '' ,nmCreate:'',dtCreate:''},
        { id: 2, fullName: 'John Doe1', username: 'jdoe', userTitle: 'Manager', adminFullName: 'Jane Smith', adminId: '004500', personExceptionStatus: 'Inactive', nmUpdate: 'admin', dtUpdate: '2025-03-06', updatedByFullName: 'John Smith', adminUsername: '', adminEmail: '', receiveDirectReportNotifications: '', blockAllNotifications: '' ,nmCreate:'',dtCreate:''},
      ]);
  
    dataSource3 = new MatTableDataSource<ELTData>([
        { id: 1, fullName: 'Paul Russo2', username: '3232', userTitle: 'EVP and Chief Medical Officer', adminFullName: 'Nancy Gelinas', adminId: '0022874', personExceptionStatus: 'Active', nmUpdate: '3234234', dtUpdate: '', updatedByFullName: '', adminUsername: '', adminEmail: '', receiveDirectReportNotifications: '', blockAllNotifications: '' ,nmCreate:'',dtCreate:''},
        { id: 2, fullName: 'John Doe2', username: 'jdoe', userTitle: 'Manager', adminFullName: 'Jane Smith', adminId: '004500', personExceptionStatus: 'Inactive', nmUpdate: 'admin', dtUpdate: '2025-03-06', updatedByFullName: 'John Smith', adminUsername: '', adminEmail: '', receiveDirectReportNotifications: '', blockAllNotifications: '' ,nmCreate:'',dtCreate:''},
      ]);

    ngOnInit() {
        this.dataSource1.paginator = this.paginator1;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource3.paginator = this.paginator3;
        this.dataSource1.sort = this.sort;
        this.dataSource2.sort = this.sort;
        this.dataSource3.sort = this.sort;
        //this.loadPersonExceptions();
    }

    onPageChange(event: any, tableNumber: number): void {
        switch (tableNumber) {
          case 1:
            if (this.dataSource1.paginator) {
                this.dataSource1.paginator.pageIndex = event.pageIndex;
            }
            break;
          case 2:
            if (this.dataSource2.paginator) {
                this.dataSource2.paginator.pageIndex = event.pageIndex;
            }
            break;
          case 3:
            if (this.dataSource3.paginator) {
                this.dataSource3.paginator.pageIndex = event.pageIndex;
            }
            break;
        }
    }

    openCreateMaintenanceDialog(): void {

    }

    deleteRecord(element: ELTData): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Confirm Deletion',
                message: `Are you sure you want to delete the record for ${element.fullName}?`
            }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Determine which dataSource is being used
                let dataSourceToUpdate;
                if (this.selectedOption === 'option1') {
                    dataSourceToUpdate = this.dataSource1;
                } else if (this.selectedOption === 'option2') {
                    dataSourceToUpdate = this.dataSource2;
                } else if (this.selectedOption === 'option3') {
                    dataSourceToUpdate = this.dataSource3;
                }
    
                // Perform deletion on the correct dataSource
                if (dataSourceToUpdate) {
                    const index = dataSourceToUpdate.data.indexOf(element);
                    if (index > -1) {
                        dataSourceToUpdate.data.splice(index, 1);
                        dataSourceToUpdate._updateChangeSubscription();  // Refresh the data source
                        this._snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
                    }
                }

                this.exclusionService.deleteRecord(element.id).subscribe(
                  (response) => {
                    // Handle success response
                    console.log('Record deleted successfully:', response);
                    this._snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
                    // Refresh the data (optional)
                    // this.loadPersonExceptions();  // Or reload the data
                  },
                  (error) => {
                    // Handle error response
                    console.error('Error deleting record:', error);
                    this._snackBar.open('Failed to delete record', 'Close', { duration: 3000 });
                  }
                );
            } else {
                console.log('Deletion canceled');
            }
        });
    }
    

  // Call this method when editing an existing record
  updateRecord(id: number, updatedData: ELTData): void {
    this.exclusionService.updateRecord(id, updatedData).subscribe(
      (response) => {
        // Handle success response
        console.log('Record updated successfully:', response);
        this._snackBar.open('Record updated successfully!', 'Close', { duration: 3000 });
      },
      (error) => {
        // Handle error response
        console.error('Error updating record:', error);
        this._snackBar.open('Failed to update record', 'Close', { duration: 3000 });
      }
    );
  }

    openEditUserDialog(user: ELTData): void {
      this.updateRecord(user.id, user); // Call the service to update the record

    }


    loadPersonExceptions(): void {
        this.loading = true;
    
        // Fetch person exceptions from the service
        this.notificationService.getPersonExceptions().subscribe(
            (data: ELTData[]) => {
                // Based on the selectedOption, update the appropriate dataSource
                if (this.selectedOption === 'option1') {
                    this.dataSource1.data = data;
                    //this.dataSource = this.dataSource1; // Optional: update the default dataSource if needed
                } else if (this.selectedOption === 'option2') {
                    this.dataSource2.data = data;
                    //this.dataSource = this.dataSource2; // Optional: update the default dataSource if needed
                } else if (this.selectedOption === 'option3') {
                    this.dataSource3.data = data;
                    //this.dataSource = this.dataSource3; // Optional: update the default dataSource if needed
                }
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                console.error('Error fetching person exceptions:', error);
                this._snackBar.open('Failed to load person exceptions', 'Close', { duration: 3000 });
                this.loading = false;
            }
        );
    }
    

    openSearchDialog(): void {
        const dialogRef = this.dialog.open(SearchDialogComponent, {
          width: '900px',
          height: '700px',
          maxWidth: 'none',   // Allow the dialog to take up 100% of the screen width

        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed');
          // Handle any actions you want after closing the dialog
          this.openConfirmationDialog(result);

        });
      }

        // Open Confirmation Dialog when user clicks Submit
    openConfirmationDialog(userData: any): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '300px'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.exclusionService.createRecord(result).subscribe(
              (response) => {
                // Handle success response
                console.log('Record created successfully:', response);
                this._snackBar.open('Record created successfully!', 'Close', { duration: 3000 });
              },
              (error) => {
                // Handle error response
                console.error('Error creating record:', error);
                this._snackBar.open('Failed to create record', 'Close', { duration: 3000 });
              }
            );
            // If confirmed, handle form submission
           // this.onSubmit(userData);  // Submit user data
          }
        });
      
        
      }

      applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        if (this.selectedOption === 'option1') {
          this.dataSource1.filter = filterValue;
        } else if (this.selectedOption === 'option2') {
          this.dataSource2.filter = filterValue;
        } else {
          this.dataSource3.filter = filterValue;
        }
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
          let data = this.dataSource1.data; // Get data from the table
          if (this.selectedOption === 'option2') {
            data = this.dataSource2.data;
          } else if (this.selectedOption === 'option3') {
            data = this.dataSource3.data;
          }

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
          a.download = 'templates.csv';
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
          XLSX.writeFile(workbook, 'templates.xlsx');
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