import { Component } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-compliancecourses',
  imports: [ MatSelectModule,
    MatFormFieldModule,
    MatOptionModule],
  templateUrl: './compliancecourses.component.html',
  styleUrl: './compliancecourses.component.css'
})
export class CompliancecoursesComponent {

}
