import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-to-production-dialog',
  imports: [CommonModule,MatDialogModule,MatButtonModule],
  templateUrl: './update-to-production-dialog.component.html',
  styleUrl: './update-to-production-dialog.component.css'
})
export class UpdateToProductionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateToProductionDialogComponent>
) {
    // data.template holds the NotificationTemplate
    // data.additionalData holds the response from the second API
  }

  onNoClick(): void {
    this.dialogRef.close(false);  // Close the dialog with a false result
  }

  onYesClick(): void {
    this.dialogRef.close(true);  // Close the dialog with a true result
  }
}
