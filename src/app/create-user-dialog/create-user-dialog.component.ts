import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-user-dialog',
  imports: [ MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.css'
})
export class CreateUserDialogComponent {
  username: string = '';
  email: string = '';
  status: string = 'Active';  // Default value
  name: string = '';

  constructor(public dialogRef: MatDialogRef<CreateUserDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // You would typically emit an event or submit the form here
    this.dialogRef.close({ username: this.username, email: this.email, name: this.name, status: this.status });
  }
}
