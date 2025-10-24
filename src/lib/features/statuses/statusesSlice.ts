import { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusRgb } from '../requests/requestsSlice';

const GET_REQUEST_URL =
  'http://intravision-task.test01.intravision.ru/api/995bce8c-fed5-43e8-a86d-2785286240f0/Statuses';

// const statusesExample = [
//   {
//     rgb: '#3cb371',
//     id: 76283,
//     name: 'Закрыта',
//   },
//   {
//     rgb: '#909090',
//     id: 76284,
//     name: 'Отложена',
//   },
//   {
//     rgb: '#fcad51',
//     id: 76285,
//     name: 'Согласование договора',
//   },
//   {
//     rgb: '#fcad51',
//     id: 76286,
//     name: 'В работе',
//   },
//   {
//     rgb: '#fd5e53',
//     id: 76287,
//     name: 'Открыта',
//   },
//   {
//     rgb: '#025969',
//     id: 76288,
//     name: 'Выполнена',
//   },
// ];

type Status =
  | 'Закрыта'
  | 'Отложена'
  | 'Согласование договора'
  | 'В работе'
  | 'Открыта'
  | 'Выполнена';

interface IStatus {
  rgb: StatusRgb;
  id: number;
  name: Status;
}

interface IInitialState {
  statuses: IStatus[];
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: IInitialState = {
  statuses: [],
  fetchStatus: 'idle',
  error: null,
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
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.statuses = action.payload;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export const selectAllStatuses = (state: RootState) => state.statuses.statuses;
export const selectStatusesStatus = (state: RootState) =>
  state.statuses.fetchStatus;
export const selectStatusesError = (state: RootState) => state.statuses.error;

export default statusesSlice.reducer;
