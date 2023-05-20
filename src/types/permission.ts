export interface Permission {
  id: string;
  name: string;
  description: string;
}

export type Permissions = Permission[];

export enum PermissionEnum {
  MANAGE_ROOM = 'manage_room',
  MANAGE_CUSTOMER = 'manage_customer',
  MANAGE_DASHBOARD = 'manage_dashboard',
  MANAGE_USER = 'manage_user',
}
