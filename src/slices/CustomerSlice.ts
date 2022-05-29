import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../lib/request';
import {
  Customer, Customers, ListResponse, RequestStatus,
} from '../types';

export interface CustomerSlice {
  list: Customers;
  status: RequestStatus;
}

const initialState: CustomerSlice = {
  list: [],
  status: RequestStatus.IDLE,
};

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async () => {
    const res = await request<ListResponse<Customer>>({
      url: '/api/v1/customers',
      method: 'get',
    });

    return res.data;
  },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.status = RequestStatus.LOADING;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, { payload }) => {
      state.list = [...payload];
      state.status = RequestStatus.SUCCEEDED;
    });
    builder.addCase(fetchCustomers.rejected, (state) => {
      state.status = RequestStatus.FAILED;
    });
  },
});

export default customerSlice.reducer;
