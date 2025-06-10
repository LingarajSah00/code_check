import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) { }
  get message(): string {
    return this.data?.message || 'Are you sure you want to proceed?';  // Default message
  }
  onNoClick(): void {
    this.dialogRef.close(false);  // Close the dialog with a false result
  }

  onYesClick(): void {
    this.dialogRef.close(true);  // Close the dialog with a true result
  }
}
