import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../lib/request';
import { RequestStatus } from '../types';

export interface TokenState {
  accessToken: string;
  refreshToken: string;
  exp: number;

  requestStatus?: RequestStatus;
}

const initialState: TokenState = {
  accessToken: '',
  refreshToken: '',
  exp: 0,

  requestStatus: RequestStatus.IDLE,
};

export const fetchToken = createAsyncThunk('auth/fetchToken', async (args: { username: string, password: string }) => {
  const token = await login(
    args.username,
    args.password,
  );

  return token;
});

export const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToken.pending, (state) => {
      state.requestStatus = RequestStatus.LOADING;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      const token = action.payload.userToken as TokenState;
      if (token) {
        state.accessToken = token.accessToken;
        state.refreshToken = token.refreshToken;
        state.exp = token.exp;
      }

      state.requestStatus = RequestStatus.SUCCEEDED;
    });
    builder.addCase(fetchToken.rejected, (state) => {
      state.requestStatus = RequestStatus.FAILED;
    });
  },
});

export const userSliceActions = tokenSlice.actions;
export default tokenSlice.reducer;
