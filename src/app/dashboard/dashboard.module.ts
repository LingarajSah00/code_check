import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { RolepermissionserviceService } from '../service/rolepermissionservice.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
          { path: '', component: DashboardComponent },  // Default route for pie chart
          { path: 'campaigns', component: CampaignsComponent }
        ])
  ]
})
export class DashboardModule {

    constructor(private rolePermissionService: RolepermissionserviceService,
  ) {}
  
  canCreateUser(): boolean {
    // Retrieve the current user's role information from localStorage
    const currentUser = localStorage.getItem('currentUserRole');
  
    // Check if we have a valid currentUser and if they have permission to delete
    if (currentUser) {
      // Parse the string back to an object
      const parsedUser = JSON.parse(currentUser);
  
      // Call the rolePermissionService to check if the user has the delete permission
      return this.rolePermissionService.hasPermission(parsedUser, 'createUser');
    }
  
    return false;  // Return false if no user is found in localStorage
  }
 }
