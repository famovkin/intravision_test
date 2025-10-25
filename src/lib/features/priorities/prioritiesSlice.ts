import { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RgbType } from '../requests/requestsSlice';

const GET_REQUEST_URL =
  'http://intravision-task.test01.intravision.ru/api/995bce8c-fed5-43e8-a86d-2785286240f0/Priorities';

export type PrioritiesName =
  | 'Очень низкий'
  | 'Низкий'
  | 'Средний'
  | 'Высокий'
  | 'Критический';

export interface IColor {
  rgb: RgbType;
  id: number;
}

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
    const response = await fetch(GET_REQUEST_URL);

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
