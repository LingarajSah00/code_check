import { Permission } from './Permission'; // Import the Permission type

export class Role {
    constructor(
      public roleName: string,  // Role name like 'Admin', 'Editor', etc.
      public permissions: Permission[]  // A list of permissions associated with the role
    ) {}
  }
  