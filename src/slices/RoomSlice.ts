import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../lib/request';
import { ListResponse, RequestStatus } from '../types';
import { Room, Rooms } from '../types/room';

export interface RoomSlice {
  list: Rooms;
  status: RequestStatus;
}

const initialState: RoomSlice = {
  list: [],
  status: RequestStatus.IDLE,
};

export const fetchRooms = createAsyncThunk(
  'room/fetchRooms',
  async () => {
    const res = await request<ListResponse<Room>>({
      url: '/api/v1/rooms',
      method: 'get',
    });

    return res.data;
  },
);

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    hideRoomById(state, { payload: id }) {
      state.list = state.list.filter(
        (item) => item.id !== id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.status = RequestStatus.LOADING;
    });
    builder.addCase(fetchRooms.fulfilled, (state, { payload }) => {
      state.list = [...payload];
      state.status = RequestStatus.SUCCEEDED;
    });
    builder.addCase(fetchRooms.rejected, (state) => {
      state.status = RequestStatus.FAILED;
    });
  },
});

export const { hideRoomById } = roomSlice.actions;

export default roomSlice.reducer;
