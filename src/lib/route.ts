import { IconType } from 'react-icons/lib';
import { CiUser } from 'react-icons/ci';
import { MdDashboard, MdOutlineBedroomParent } from 'react-icons/md';
import { RiCustomerService2Line } from 'react-icons/ri';
import { PermissionEnum, User } from '../types';

export interface IRoute {
  to: string;
  icon: IconType,
  name: string;
  permission: boolean | ((user: User) => boolean) | string | string[];
}

export const Routes: IRoute[] = [
  {
    to: '/dashboard',
    icon: MdDashboard,
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
    icon: RiCustomerService2Line,
    permission: [PermissionEnum.MANAGE_CUSTOMER],
  },
  {
    to: '/room',
    name: '房间信息',
    icon: MdOutlineBedroomParent,
    permission: [PermissionEnum.MANAGE_ROOM],
  },
  {
    to: '/user',
    name: '用户管理',
    icon: CiUser,
    permission: [PermissionEnum.MANAGE_USER],
  },
];
