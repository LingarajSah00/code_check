import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // <-- Ensure this is imported
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MaintenanceService } from '../service/maintenance.service';

@Component({
  selector: 'app-create-maintenance-dialog',
  imports: [MatDialogModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSnackBarModule,
      FormsModule,
      MatSelectModule,
  CommonModule,
  FormsModule],
  templateUrl: './create-maintenance-dialog.component.html',
  styleUrl: './create-maintenance-dialog.component.css'
})
export class CreateMaintenanceDialogComponent {
 // Define maintenance properties that will bind to the template
 id: string = '';
 type: string = '';
 name: string = '';
 emp_id: string = '';
 title: string = '';
 admin: string = '';
 admin_id: string = '';
 receive: string = '';
 status: string = '';

 constructor(private maintenanceService: MaintenanceService,
   private dialogRef: MatDialogRef<CreateMaintenanceDialogComponent>,
   private dialog: MatDialog
 ) {}

 // Submit the form
 submitForm(): void {
   // Simple check for required fields (you can add more validations here)
   if (this.id && this.type && this.name && this.emp_id && this.title && this.admin && this.admin_id && this.receive && this.status) {
     // Open confirmation dialog before submitting the form
     this.openConfirmationDialog();
   } else {
     console.log("Form is invalid!");
   }
 }

 // Close the dialog without any further action (cancel)
 closeDialog(): void {
   this.dialogRef.close(); // Just close the dialog on cancel
 }

 // Open confirmation dialog
 openConfirmationDialog(): void {
   const dialogRef = this.dialog.open(ConfirmationDialogComponent); // Open confirmation dialog
   
   dialogRef.afterClosed().subscribe((result) => {
     if (result) {
       // Only close with the form data if confirmed
       const newMaintenance = {
         id: this.id,
         type: this.type,
         name: this.name,
         emp_id: this.emp_id,
         title: this.title,
         admin: this.admin,
         admin_id: this.admin_id,
         receive: this.receive,
         status: this.status
       };

       this.maintenanceService.addMaintenance(newMaintenance).subscribe(
        (response) => {
         },
        (error) => {
          console.error('Error adding maintenance record:', error);
        }
      );
       this.dialogRef.close(newMaintenance); // Send data back to parent


     } else {
       console.log('Form submission canceled'); // Do nothing if canceled
     }
   });
 }
}
