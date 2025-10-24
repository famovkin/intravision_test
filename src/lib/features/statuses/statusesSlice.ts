import { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IColor } from '../priorities/prioritiesSlice';

const GET_REQUEST_URL =
  'http://intravision-task.test01.intravision.ru/api/995bce8c-fed5-43e8-a86d-2785286240f0/Statuses';

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
    const response = await fetch(GET_REQUEST_URL);

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
