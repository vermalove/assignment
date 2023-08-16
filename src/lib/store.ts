// src/lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import recordReducer from './recordReducer';

export const store = configureStore({
  reducer: {
    records: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
