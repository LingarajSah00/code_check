import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editcampaignsdialog',
  imports: [MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        FormsModule,
        MatSelectModule,
        CommonModule],
  templateUrl: './editcampaignsdialog.component.html',
  styleUrl: './editcampaignsdialog.component.css'
})
export class EditcampaignsdialogComponent {
statuses: string[] = ['Active', 'Inactive'];  // Define possible status options
  selectedStatus: string;

  constructor(
    public dialogRef: MatDialogRef<EditcampaignsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the selectedStatus based on the current user's status
    this.selectedStatus = data.status;
  }

  // When the user confirms, close the dialog and send back the updated status
  onConfirm(): void {
    this.dialogRef.close(this.selectedStatus);
  }

  // When the user cancels, just close the dialog without returning anything
  onCancel(): void {
    this.dialogRef.close();
  }
}
