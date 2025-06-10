export class Permission {
    constructor(
      public permissionName: string,  // Permission like 'createUser', 'editUser', etc.
      public description: string  // Description of the permission
    ) {}
  }
  