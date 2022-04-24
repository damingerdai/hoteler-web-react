/* eslint-disable import/no-named-as-default */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import statSlice from './slices/StatSlice';
import tokenSlice from './slices/TokenSlice';
import userSlice from './slices/UserSlice';

const reducer = combineReducers({
  stat: statSlice,
  token: tokenSlice,
  user: userSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
