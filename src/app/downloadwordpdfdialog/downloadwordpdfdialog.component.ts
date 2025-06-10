import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';   // Import MatRadioModule
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-downloadwordpdfdialog',
  imports: [MatDialogModule,MatRadioModule,MatButtonModule,FormsModule],
  templateUrl: './downloadwordpdfdialog.component.html',
  styleUrl: './downloadwordpdfdialog.component.css'
})
export class DownloadwordpdfdialogComponent {
  selectedFormat: string = 'pdf'; // Default to CSV

  constructor(
    public dialogRef: MatDialogRef<DownloadwordpdfdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onExport(): void {
    this.dialogRef.close(this.selectedFormat);
  }
}
