import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../lib/request';
import { DataResponse, PastWeekCustomerCounts, RoomStatusDonut } from '../types';

export interface StatState {
  roomStatusDonut: {
    totalNums: number;
    inUseNums: number;
    notUsedNums: number;
  };

  pastWeekCustomerCounts: Array<{ checkInDate: string; customerCount: number }>
}

const initialState: StatState = {
  roomStatusDonut: {
    totalNums: 0,
    inUseNums: 0,
    notUsedNums: 0,
  },

  pastWeekCustomerCounts: [],
};

export const fecthRoomStatusDonut = createAsyncThunk(
  'stat/fecthRoomStatusDonut',
  async () => {
    const res = await request<DataResponse<RoomStatusDonut>>({
      url: '/api/v1/stat/rooms/nums',
      method: 'get',
    });

    return res.data;
  },
);

export const fetchPastWeekCustomerCounts = createAsyncThunk(
  'stat/fetchPastWeekCustomerCounts',
  async () => {
    const res = await request<DataResponse<{ pastWeekCustomerCounts: PastWeekCustomerCounts }>>({
      url: '/api/v1/stat/customers/counts',
      method: 'get',
    });

    return res.data;
  },
);

const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fecthRoomStatusDonut.fulfilled, (state, { payload }) => {
      state.roomStatusDonut = {
        ...payload,
      };
    });
    builder.addCase(fetchPastWeekCustomerCounts.fulfilled, (state, { payload }) => {
      state.pastWeekCustomerCounts = [...payload.pastWeekCustomerCounts];
    });
  },
});

export default statSlice.reducer;
