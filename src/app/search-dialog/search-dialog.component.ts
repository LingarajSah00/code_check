import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';  // Import MatDialog
import { MatRadioModule } from '@angular/material/radio';   // Import MatRadio
import { MatInputModule } from '@angular/material/input';   // Import MatInput
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Import MatAutocomplete
import { MatButtonModule } from '@angular/material/button';  // Import MatButton
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-search-dialog',
  imports: [ MatDialogModule,
    MatRadioModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,FormsModule, MatTableModule,   ReactiveFormsModule ,CommonModule ,MatIconModule,MatSelectModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css'
})
export class SearchDialogComponent {
  firstDropdownSelection: string='';
  secondDropdownSelection: string='';
  radioSelection = 'option1';  // Default selection for the radio buttons
  options: string[] = [];  // This will store the options based on the radio selection
  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;  // For filtering the options
  selectedFile: File | null = null; // Holds the selected file

   // Table data
   tableData = [
    { name: 'John Doe',  status: 'Active' },
    { name: 'Jane Smith',  status: 'Active' },
    { name: 'James Brown',  status: 'InActive' }
  ];

  displayedColumns: string[] = ['name',  'status'];

  // Sample data for auto-suggestion
  allOptions: { [key: string]: string[] } = {
    option1: ['Emp1', 'Emp2', 'Emp3', 'Emp4'],
    option2: ['Location1', 'Location2', 'Location3', 'Location4'],
    option3: ['Leader1', 'Leader2', 'Leader3', 'Leader4']
  };

  onOkClick(): void {
    console.log("OK button clicked!");
    // Add any logic you need for the "OK" button here.
  }
  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  onRadioChange(event: any) {
    this.radioSelection = event.value;
    this.options = this.allOptions[this.radioSelection];
    this.searchControl.setValue('');
    // Disable the search input when 'Location' is selected, else enable it
    if (this.radioSelection === 'option4') {
      this.searchControl.disable();  // Disable the form control for Location
    } else {
      this.searchControl.enable();   // Enable the form control for other options
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  closeDialog() {
    this.dialogRef.close();
  }


  onSubmit(): void {
    // You can add your logic to save the new campaign here (e.g., call a service to store the campaign)
  
    // Redirect to the campaigns list page (e.g., the list of campaigns)
    //this.router.navigate(['/campaigns']);
    this.dialogRef.close();
  
  }
  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];  // Get the first selected file
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file);
      // You can now process the file (e.g., upload it to the server)
    }
  }
}
