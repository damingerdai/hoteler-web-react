import { Customer, ListResponse } from '../types';
import { request } from '../lib';

export const fetchCustomers = async () => {
  const res = await request<ListResponse<Customer>>({
    url: '/api/v1/customers',
    method: 'get',
  });

  return res.data;
};
