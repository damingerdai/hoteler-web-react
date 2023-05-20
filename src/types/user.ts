import { UserRoles } from './userRole';
import { Permissions } from './permission';

export interface User {
  id: string;
  username: string;
  roles: UserRoles;
  permissions: Permissions;
}
