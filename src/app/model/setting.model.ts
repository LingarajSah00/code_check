export interface Setting {
    name: string;
    value: string;
    valueDataType: string;
    canUpdate: boolean;
    securityRoles: string[];
    nmCreate: string;
    dtCreate: string;
    nmUpdate: string;
    dtUpdate: string;
  }
  