import { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const GET_REQUEST_URL =
  'http://intravision-task.test01.intravision.ru/api/995bce8c-fed5-43e8-a86d-2785286240f0/Users';

// const executorsExample = [
//   {
//     id: 58142,
//     name: 'Сидоров Иван',
//   },
//   {
//     id: 58143,
//     name: 'Петров Борис',
//   },
//   {
//     id: 58144,
//     name: 'Иванов Андрей',
//   },
// ];

interface IExecutor {
  id: number;
  name: string;
}

interface IInitialState {
  executors: IExecutor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: IInitialState = {
  executors: [],
  status: 'idle',
  error: null,
};

export const fetchExecutors = createAsyncThunk(
  'executors/fetchExecutors',
  async () => {
    const response = await fetch(GET_REQUEST_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения списка исполнителей');
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
      .addCase(fetchExecutors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExecutors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.executors = action.payload;
      })
      .addCase(fetchExecutors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export const selectAllExecutors = (state: RootState) =>
  state.executors.executors;
export const selectExecutorsStatus = (state: RootState) =>
  state.executors.status;
export const selectExecutorsError = (state: RootState) => state.executors.error;

export default executorsSlice.reducer;
