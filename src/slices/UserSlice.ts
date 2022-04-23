import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../lib/request';
import { DataResponse, User, UserRoles } from '../types';

export interface UserState {
  id: string;
  username: string;
  roles: UserRoles;
}

const initialState: UserState = {
  id: '',
  username: '',
  roles: [],
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (token?: string) => {
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
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetState: (_state) => initialState,
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const user = action.payload.data;
      state.id = user.id;
      state.username = user.username;
      state.roles = [...user.roles];
    });
  },
});

export const { resetState, setUsername } = userSlice.actions;
export default userSlice.reducer;
