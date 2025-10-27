import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GET_STATUSES_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { IColor } from '@/lib/types';

type StatusName =
  | 'Закрыта'
  | 'Отложена'
  | 'Согласование договора'
  | 'В работе'
  | 'Открыта'
  | 'Выполнена';

interface IStatus extends IColor {
  name: StatusName;
}

interface IInitialState {
  statuses: IStatus[];
}

const initialState: IInitialState = {
  statuses: [],
};

export const fetchStatuses = createAsyncThunk(
  'statuses/fetchStatuses',
  async () => {
    const response = await fetch(GET_STATUSES_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения списка статусов');
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
    builder.addCase(fetchStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload;
    });
  },
});

export const selectAllStatuses = (state: RootState) => state.statuses.statuses;

export default statusesSlice.reducer;
