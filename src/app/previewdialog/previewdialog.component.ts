import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-previewdialog',
  imports: [MatDialogModule,CommonModule,MatButtonModule],
  templateUrl: './previewdialog.component.html',
  styleUrl: './previewdialog.component.css'
})
export class PreviewdialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<PreviewdialogComponent>) {}

   // Logic to handle form submission after confirmation
   submitData() {
    // Submit the data or perform any action needed
    console.log('Form submitted with data:', {
    
    });
  }

  onSubmit() {
    this.dialogRef.close(true);  // Close and indicate submission
  }

  onClose() {
    this.dialogRef.close(false);  // Just close the dialog without submitting
  }
}
