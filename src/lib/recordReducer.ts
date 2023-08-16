// src/reducers/recordReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Record {
 
  name: string;
  status: string;
}

interface RecordState {
  records: Record[];
}

const initialState: RecordState = {
  records: [],
};

const recordSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<Record>) => {
      state.records.push(action.payload);
    },
    deleteRecord: (state, action: PayloadAction<number>) => {
    //   state.records = state.records.filter(record => record !== action.payload);
    },
  },
});

export const { addRecord, deleteRecord } = recordSlice.actions;
export default recordSlice.reducer;
