import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GET_PRIORITIES_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { IColor } from '@/lib/types';

export type PrioritiesName =
  | 'Очень низкий'
  | 'Низкий'
  | 'Средний'
  | 'Высокий'
  | 'Критический';

interface IPriority extends IColor {
  name: PrioritiesName;
}

interface IInitialState {
  priorities: IPriority[];
}

const initialState: IInitialState = {
  priorities: [],
};

export const fetchPriorities = createAsyncThunk(
  'priorities/fetchPriorities',
  async () => {
    const response = await fetch(GET_PRIORITIES_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения списка приоритетов');
    }

    const res = await response.json();

    return res;
  }
);

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPriorities.fulfilled, (state, action) => {
      state.priorities = action.payload;
    });
  },
});

export const selectPriorities = (state: RootState) =>
  state.priorities.priorities;

export default prioritiesSlice.reducer;
