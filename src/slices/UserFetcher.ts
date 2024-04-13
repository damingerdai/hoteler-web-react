import { request } from '../lib';
import { DataResponse, ListResponse, User } from '../types';

export const fetchCurrenter = async (token?: string) => {
  const headers = {} as any;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await request<DataResponse<User>>({
    url: '/api/v1/user',
    method: 'get',
    headers,
  });

  return res;
};

export const fetchUsers = async () => {
  const res = await request<ListResponse<User>>({
    url: '/api/v1/users',
    method: 'get',
  });

  return res.data;
};
