import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { GET_STATUSES_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { IColor, StatusName } from '@/types/types';

export interface IStatus extends IColor {
  name: StatusName;
}

interface IInitialState {
  statuses: IStatus[];
  error: string | null;
}

const initialState: IInitialState = {
  statuses: [],
  error: null,
};

export const fetchStatuses = createAsyncThunk(
  'statuses/fetchStatuses',
  async () => {
    const response = await fetch(GET_STATUSES_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения статусов');
    }

    const res = await response.json();

    return res;
  }
);

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения статусов';
      });
  },
});

export const selectAllStatuses = (state: RootState) => state.statuses.statuses;
export const selectStatusesError = (state: RootState) => state.statuses.error;

export default statusesSlice.reducer;
