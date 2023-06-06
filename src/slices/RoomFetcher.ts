import { ListResponse, Room } from '../types';
import { request } from '../lib';

export const fetchRooms = async () => {
  const res = await request<ListResponse<Room>>({
    url: '/api/v1/rooms',
    method: 'get',
  });

  return res.data;
};
