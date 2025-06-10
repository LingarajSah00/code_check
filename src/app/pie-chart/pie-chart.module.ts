import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { PiechatComponent } from '../piechat/piechat.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PiechatComponent }  // Default route for pie chart
    ])
  ]
})
export class PieChartModule { }
