import { Component } from '@angular/core';
import { Router } from '@angular/router'; // To navigate after form submission
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';  // Import slide toggle module
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { EdituserdialogComponent } from '../edituserdialog/edituserdialog.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
interface Campaign {
  name: string;
  type: string;
  description?: string;
  status: string;
  audience_group: string;
}
@Component({
  selector: 'app-createnotificationtemplate',
  imports: [MatTableModule  ,   // Import MatTableModule for Angular Material Table
          MatButtonModule,  // Optional: To add buttons or actions
          MatIconModule,     // Optional: For adding icons (e.g., edit, delete)
          MatPaginatorModule, // For pagination
          MatInputModule,
          MatDialogModule,
          MatButtonModule,
          MatInputModule,
          MatFormFieldModule,
          MatSnackBarModule,
          MatSlideToggleModule,
          FormsModule,
        CommonModule,
        MatSelectModule,
        MatOptionModule,],
  templateUrl: './createnotificationtemplate.component.html',
  styleUrl: './createnotificationtemplate.component.css'
})
export class CreatenotificationtemplateComponent {
// New campaign model
 campaign: Campaign = {
  name: '',
  type: '',
  description: '',
  audience_group: '',
  status: 'ACTIVE'
};

// Campaign statuses
statuses = ['ACTIVE', 'INACTIVE'];

constructor(private router: Router,public dialogRef: MatDialogRef<CreateUserDialogComponent>) {}

// Handle form submission
onSubmit(): void {
  // You can add your logic to save the new campaign here (e.g., call a service to store the campaign)
  console.log('New Campaign Created:', this.campaign);

  // Redirect to the campaigns list page (e.g., the list of campaigns)
  //this.router.navigate(['/campaigns']);
  this.dialogRef.close({ name: this.campaign.name, type: this.campaign.type,description:this.campaign.description,audience_group:this.campaign.audience_group, status: this.campaign.status});

}

// Cancel the form and go back to the campaign list
onCancel(): void {
  this.dialogRef.close();
}



}
