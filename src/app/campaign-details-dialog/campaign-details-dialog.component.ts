import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-details-dialog',
  imports: [MatDialogModule],
  templateUrl: './campaign-details-dialog.component.html',
  styleUrl: './campaign-details-dialog.component.css'
})
export class CampaignDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CampaignDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
