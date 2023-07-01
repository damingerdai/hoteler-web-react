import { request } from '../lib';
import { DataResponse, User } from '../types';

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
