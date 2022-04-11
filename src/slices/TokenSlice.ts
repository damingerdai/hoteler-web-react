import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../lib/request';

export interface TokenState {
  accessToken: string;
  refreshToken: string;
  exp: number
}

const initialState: TokenState = {
  accessToken: '',
  refreshToken: '',
  exp: 0,
};

export const fetchToken = createAsyncThunk('auth/fetchToken', async (args: { username: string, password: string }) => {
  const token = await request({
    url: 'api/v1/token',
    method: 'post',
    headers: {
      username: args.username,
      password: args.password,
    },
  });

  return token;
});

export const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      const token = action.payload.userToken as TokenState;
      if (token) {
        state.accessToken = token.accessToken;
        state.refreshToken = token.refreshToken;
        state.exp = token.exp;
      }
    });
  },
});

export const userSliceActions = tokenSlice.actions;
export default tokenSlice.reducer;
