import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';   // Import MatRadioModule
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-downloaddialog',
  imports: [MatDialogModule,MatRadioModule,MatButtonModule,FormsModule],
  templateUrl: './downloaddialog.component.html',
  styleUrl: './downloaddialog.component.css'
})
export class DownloaddialogComponent {
  selectedFormat: string = 'csv'; // Default to CSV

  constructor(public dialogRef: MatDialogRef<DownloaddialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog when Cancel is clicked
  }

  onDownload(): void {
    this.dialogRef.close(this.selectedFormat); // Close dialog and pass the selected format
  }
}
