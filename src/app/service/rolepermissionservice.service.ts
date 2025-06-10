import { Injectable } from '@angular/core';
import { Role } from '../model/Role';
import { Permission } from '../model/Permission';
import { UserData } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class RolepermissionserviceService {

  constructor() { }


  private roles: Role[] = [
    new Role('superuser', [
      new Permission('createUser', 'Create new user'),
      new Permission('editUser', 'Edit user'),
      new Permission('deleteUser', 'Delete user'),
      new Permission('createUserForTemp', 'Create new user'),

    ]),
    new Role('compuser', [
      new Permission('editUser', 'Edit user'),
      new Permission('viewUser', 'View user'),
      new Permission('createUser', 'Create new user'),
      


    ]),
    new Role('viewonly', [
      new Permission('viewUser', 'View'),
    ])
  ];

// Check if a user has the given permission across all roles
hasPermission(user: UserData, permissionName: string): boolean {
  // Iterate over all roles the user has
  for (let roleName of user.securityRoles) {
    const userRole = this.getUserRole(user);
    if (userRole) {
      const permission = userRole.permissions.find(p => p.permissionName === permissionName);
      if (permission) {
        return true;  // User has the permission
      }
    }
  }
  return false;  // User doesn't have the permission in any of their roles
}

  // Get the Role of a user based on their role name
  private getUserRole(user: UserData): Role | undefined {
    return this.roles.find(role => role.roleName === user.securityRoles[0]); // Assuming the user has one role
  }
}
