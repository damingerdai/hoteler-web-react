import { PermissionEnum, User } from '../types';

export interface IRoute {
  to: string;
  name: string;
  permission: boolean | ((user: User) => boolean) | string | string[];
}

export const Routes: IRoute[] = [
  {
    to: '/dashboard',
    name: '仪表盘',
    permission: (user: User) => {
      const permissions = user.permissions.map((p) => p.name);
      if (permissions.includes(PermissionEnum.MANAGE_DASHBOARD)) {
        return true;
      }
      return false;
    },
  },
  {
    to: '/customer',
    name: '客户信息',
    permission: [PermissionEnum.MANAGE_CUSTOMER],
  },
  {
    to: '/room',
    name: '房间信息',
    permission: [PermissionEnum.MANAGE_ROOM],
  },
];
