import { Component ,ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';  // For pagination
import { MatTableDataSource } from '@angular/material/table'; // For working with data source
import { MatSort } from '@angular/material/sort';  // Optional: For sorting
import { EditTemplateDialogComponent } from '../edit-template-dialog/edit-template-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreatenotificationtemplateComponent } from '../createnotificationtemplate/createnotificationtemplate.component';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { NotificationTemplate } from '../model/notification.template.model';
import * as XLSX from 'xlsx';
import { DownloaddialogComponent } from '../downloaddialog/downloaddialog.component';
import { MemoModel } from '../model/memo.model';
import { EditmemoComponent } from '../editmemo/editmemo.component';
import { CreatememoComponent } from '../creatememo/creatememo.component';
import { ClonememoComponent } from '../clonememo/clonememo.component';
import { RolepermissionserviceService } from '../service/rolepermissionservice.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MemoserviceService } from '../service/memoservice.service';

interface MemoData {
  id: number;
  name: string;
  email: string;
  status: string;
}
@Component({
  selector: 'app-memos',
  imports: [MatTooltipModule, CommonModule, MatTableModule  ,   // Import MatTableModule for Angular Material Table
    MatButtonModule,  // Optional: To add buttons or actions
    MatIconModule,     // Optional: For adding icons (e.g., edit, delete)
    MatPaginatorModule, // For pagination
    MatInputModule,
    HttpClientModule],
  templateUrl: './memos.component.html',
  styleUrl: './memos.component.css'
})
export class MemosComponent {

    constructor(private memoserviceService :MemoserviceService ,private rolePermissionService: RolepermissionserviceService,public dialog: MatDialog, private _snackBar: MatSnackBar) {}
  
  // Paginator reference to connect to the mat-paginator in the template
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // This is used for sorting (optional, if needed)
  @ViewChild(MatSort) sort!: MatSort;
  templates: MemoModel[] = [];  

  displayedColumns: string[] = [ 'name', 'status','actions']; // Define table column names
  dataSource = new MatTableDataSource<MemoModel>([
    { id: 1, name: 'Memo1', abbrName: 'EMP_NH_DUE', status: 'active',audience_group:'Production',type:'EMP_AN_DUE',description:'To Employee Compliance Annual Due',subject:'Compliance Annual Due',body:'Compliance Annual Due',nmCreate:'',dtCreate:'',nmUpdate:'',dtUpdate:'' },
    { id: 1, name: 'Memo1', abbrName: 'EMP_NH_DUE', status: 'active',audience_group:'Production',type:'EMP_AN_DUE',description:'To Employee Compliance Annual Due',subject:'Compliance Annual Due',body:'Compliance Annual Due',nmCreate:'',dtCreate:'',nmUpdate:'',dtUpdate:'' },
    { id: 1, name: 'Memo1', abbrName: 'EMP_NH_DUE', status: 'active',audience_group:'Production',type:'EMP_AN_DUE',description:'To Employee Compliance Annual Due',subject:'Compliance Annual Due',body:'Compliance Annual Due',nmCreate:'',dtCreate:'',nmUpdate:'',dtUpdate:'' },
    { id: 1, name: 'Memo1', abbrName: 'EMP_NH_DUE', status: 'active',audience_group:'Production',type:'EMP_AN_DUE',description:'To Employee Compliance Annual Due',subject:'Compliance Annual Due',body:'Compliance Annual Due',nmCreate:'',dtCreate:'',nmUpdate:'',dtUpdate:'' },
    { id: 1, name: 'Memo1', abbrName: 'EMP_NH_DUE', status: 'active',audience_group:'Production',type:'EMP_AN_DUE',description:'To Employee Compliance Annual Due',subject:'Compliance Annual Due',body:'Compliance Annual Due',nmCreate:'',dtCreate:'',nmUpdate:'',dtUpdate:'' },
  ]);


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  // Optional: Enable sorting by columns
    //this.loadTemplates();  // Call the loadTemplates method to fetch data

  }

  // Filter the table based on the input search text
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // When a row is clicked, open the edit dialog
  onRowClick(template: MemoModel): void {
    const dialogRef = this.dialog.open(EditmemoComponent, {
      width: '1300px', // Set a fixed width (you can adjust this value)
      height: '800px', // Set a fixed height (you can adjust this value)
      maxWidth: 'none',   // Allow the dialog to take up 100% of the screen width
      panelClass: 'custom-dialog', // Add the custom CSS class here

      data: template.body // Pass the clicked row data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.memoserviceService.updateUser(result).subscribe(
        //   (response) => {
        //     console.log('User updated successfully', response);
        //     this.dialog.closeAll();  // Close all open dialogs on success
        //     this._snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        //   },
        //   (error) => {
        //     console.error('Error updating user', error);
        //     this._snackBar.open('Error updating user. Please try again.', 'Close', { duration: 3000 });
        //   }
        // );
        
        // If dialog returns edited data, update the table data
        const index = this.dataSource.data.findIndex(item => item.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result; // Update the modified data
          this.dataSource._updateChangeSubscription(); // Refresh the table
        }
      }
    });
  }

  // When a row is clicked, open the edit dialog
  onRowClick1(template: MemoModel): void {
    const dialogRef = this.dialog.open(ClonememoComponent, {
      width: '1300px', // Set a fixed width (you can adjust this value)
      height: '800px', // Set a fixed height (you can adjust this value)
      maxWidth: 'none',   // Allow the dialog to take up 100% of the screen width
      panelClass: 'custom-dialog', // Add the custom CSS class here

      data: template.body // Pass the clicked row data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If dialog returns edited data, update the table data
        const index = this.dataSource.data.findIndex(item => item.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result; // Update the modified data
          this.dataSource._updateChangeSubscription(); // Refresh the table
        }
      }
    });
  }
    deleteRecord(element: MemoModel): void {
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
          // this.memoserviceService.deleteUser(result).subscribe(
          //   (response) => {
          //     this._snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
          //    // this.loadUsers();
          //   },
          //   (error) => {
          //     console.error('Error deleting user', error);
          //     this._snackBar.open('Error deleting user. Please try again.', 'Close', { duration: 3000 });
          //   }
          // );
          
          if (index > -1) {
            this.dataSource.data.splice(index, 1);  // Remove the record from the dataSource
            this.dataSource._updateChangeSubscription();  // Refresh table view
            this._snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
          }
        } else {
          console.log('Deletion canceled');
        }
      });
    }

    openCreateUserDialog(): void {
        const dialogRef = this.dialog.open(CreatememoComponent, {
          width: '1300px', // Set a fixed width (you can adjust this value)
      height: '800px', // Set a fixed height (you can adjust this value)
      maxWidth: 'none',   // Allow the dialog to take up 100% of the screen width
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
  const newUser: MemoData = {
    id: this.dataSource.data.length + 1,
    name: userData.name,
    email: userData.email,
    status: userData.status
  };

  // this.memoserviceService.createUser(newUser).subscribe(
  //   (response) => {
  //     console.log('User created successfully', response);
  //     // Handle success (e.g., close dialog, refresh user list)
  //     this.dialog.closeAll();  // Close the dialog upon success
  //   },
  //   (error) => {
  //     console.error('Error creating user', error);
  //     // Handle error (e.g., show an error message)
  //   }
  // );
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
