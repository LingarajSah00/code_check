import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';  // Required for the date picker
import { NativeDateAdapter } from '@angular/material/core';  // Import the NativeDateAdapter
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-email-dialog',
  imports: [MatDatepickerModule,MatNativeDateModule,MatDatepickerModule,MatSelectModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatFormFieldModule,FormsModule,CommonModule,MatCheckboxModule],
  
  providers: [
    MatNativeDateModule // 👈 add this if you're still seeing the error
  ],
  templateUrl: './email-dialog.component.html',
  styleUrl: './email-dialog.component.css'
})
export class EmailDialogComponent {
  email: string = '';
  emailAttempts: string[] = ['1', '2', '3']; // Dropdown values
  selectedEmailAttempt: string = '';
  neededDate: Date = new Date(); // Default date to today
  termsAccepted: boolean = false; // Checkbox state

  constructor(private dialogRef: MatDialogRef<EmailDialogComponent>) {}

  // Send email and close dialog
  sendEmail(): void {
    if (this.email) {
      this.dialogRef.close({ email: this.email });  // Close the dialog and send email
    } else {
      alert('Please enter a valid email address');
    }
  }

  // Close the dialog without sending email
  closeDialog(): void {
    this.dialogRef.close();  // Simply close the dialog
  }
}
