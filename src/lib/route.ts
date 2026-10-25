import { PermissionEnum } from '../types';
export const routes = [
  {
    to: '/dashboard',
    name: '仪表盘',
    permission: PermissionEnum.MANAGE_DASHBOARD
  },
  {
    to: '/customer',
    name: '客户信息',
    permission: PermissionEnum.MANAGE_CUSTOMER
  },
  { to: '/room', name: '房间信息', permission: PermissionEnum.MANAGE_ROOM },
  { to: '/user', name: '用户管理', permission: PermissionEnum.MANAGE_USER }
] as const;
