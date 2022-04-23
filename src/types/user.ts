import { UserRoles } from './userRole';

export interface User {
  id: string;
  username: string;
  roles: UserRoles;
}
