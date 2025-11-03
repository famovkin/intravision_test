import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { GET_EXECUTORS_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';

export interface IExecutor {
  id: number;
  name: string;
}

interface IInitialState {
  executors: IExecutor[];
  error: null | string;
}

const initialState: IInitialState = {
  executors: [],
  error: null,
};

export const fetchExecutors = createAsyncThunk(
  'executors/fetchExecutors',
  async () => {
    const response = await fetch(GET_EXECUTORS_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения исполнителей');
    }

    const res = await response.json();

    return res;
  }
);

const executorsSlice = createSlice({
  name: 'executors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutors.fulfilled, (state, action) => {
        state.executors = action.payload;
      })
      .addCase(fetchExecutors.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export const selectAllExecutors = (state: RootState) =>
  state.executors.executors;
export const selectExecutorsError = (state: RootState) => state.executors.error;

export default executorsSlice.reducer;
