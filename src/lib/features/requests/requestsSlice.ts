import { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const GET_REQUEST_URL =
  'http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=995bce8c-fed5-43e8-a86d-2785286240f0';

interface ITag {
  id: number;
  name: string;
}

export type StatusRgb = `#${string}`;

// const requestExample = {
//   createdAt: '2025-10-22T18:53:57.2939101+03:00',
//   description:
//     '<p style="colo#e5e5e5;">Уха</p> из трех видов рыб. Салат с телятиной. МОРС КЛЮКВЕННЫЙ',
//   executorGroupId: 58142,
//   executorGroupName: 'Офис менеджеры',
//   executorId: 58143,
//   executorName: 'Петров Борис',
//   id: 102129,
//   initiatorId: 58144,
//   initiatorName: 'Иванов Андрей',
//   name: 'Заказать обед',
//   price: 100,
//   priorityId: 70238,
//   priorityName: 'Средний',
//   resolutionDatePlan: '2025-10-22T18:53:57.2939101+03:00',
//   serviceId: 58142,
//   serviceName: 'Еда > Заказ обедов',
//   statusId: 76287,
//   statusName: 'Открыта',
//   statusRgb: '#fd5e53',
//   tags: [
//     { id: 70237, name: 'Салат' },
//     { id: 70236, name: 'Суп' },
//   ],
//   taskTypeId: 58143,
//   taskTypeName: 'Стандартный',
//   updatedAt: '2025-10-22T18:53:57.2939101+03:00',
// };

interface IRequest {
  createdAt: string;
  description: string;
  executorGroupId: number;
  executorGroupName: string;
  executorId: number;
  executorName: string;
  id: number;
  initiatorId: number;
  initiatorName: string;
  name: string;
  price: number;
  priorityId: number;
  priorityName: string;
  resolutionDatePlan: string;
  serviceId: number;
  serviceName: string;
  statusId: number;
  statusName: string;
  statusRgb: StatusRgb;
  tags: ITag[];
  taskTypeId: number;
  taskTypeName: string;
  updatedAt: string;
}

interface IInitialState {
  requests: IRequest[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: IInitialState = {
  requests: [],
  status: 'idle',
  error: null,
};

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async () => {
    const response = await fetch(GET_REQUEST_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения списка заявок');
    }

    const res = await response.json();

    return res.value;
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = state.requests.concat(action.payload);
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export const selectAllRequests = (state: RootState) => state.requests.requests;
export const selectRequestsStatus = (state: RootState) => state.requests.status;
export const selectRequestsError = (state: RootState) => state.requests.error;

export default requestsSlice.reducer;
