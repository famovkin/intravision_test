import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ALL_REQUESTS_URL, SINGlE_REQUEST_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { RgbType, StatusesType } from '@/lib/types';
import { PrioritiesName } from '../priorities/prioritiesSlice';

interface ITag {
  id: number;
  name: string;
}

const editRequestExample = {
  id: 102129,
  comment: 'string',
  statusId: 76284,
  tags: [70240],
  executorId: 58143,
};

export interface IRequest {
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
  priorityName: PrioritiesName;
  resolutionDatePlan: string;
  serviceId: number;
  serviceName: string;
  statusId: number;
  statusName: string;
  statusRgb: RgbType;
  tags: ITag[];
  taskTypeId: number;
  taskTypeName: string;
  updatedAt: string;
}

interface INewRequest {
  name: string;
  description: string;
}

interface IInitialState {
  requests: IRequest[];
  status: StatusesType;
  error: null | string;
}

const initialState: IInitialState = {
  requests: [],
  status: 'idle',
  error: null,
};

export const fetchRequests = createAsyncThunk<
  IRequest[],
  void,
  { state: RootState }
>(
  'requests/fetchRequests',
  async () => {
    const response = await fetch(ALL_REQUESTS_URL);

    if (!response.ok) {
      throw new Error('Ошибка получения списка заявок');
    }

    const res = await response.json();

    return res.value;
  },
  {
    condition: (_, { getState }) => {
      const { requests } = getState();
      if (requests.status === 'loading' || requests.status === 'succeeded') {
        return false;
      }
      return true;
    },
  }
);

export const addNewRequest = createAsyncThunk<
  IRequest,
  INewRequest,
  { state: RootState }
>('requests/addNewRequest', async (newRequest) => {
  const response = await fetch(SINGlE_REQUEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newRequest,
      // Значения по умолчанию
      resolutionDatePlan: '2026-12-31T00:00:00.2939101+03:00',
      tags: [70240],
    }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при создании новой заявки');
  }

  const newRequestId = await response.json();
  const newRequestResponse = await fetch(
    `${SINGlE_REQUEST_URL}${newRequestId}`
  );

  if (!newRequestResponse.ok) {
    throw new Error('Ошибка получения информации о заявке');
  }

  const newRequestData = await newRequestResponse.json();

  return newRequestData;
});

export const editRequest = createAsyncThunk<
  IRequest,
  void,
  { state: RootState }
>('requests/editRequest', async () => {
  const response = await fetch(SINGlE_REQUEST_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editRequestExample),
  });

  if (!response.ok) {
    throw new Error('Ошибка при создании новой заявки');
  }

  // TODO: поправить логику
  const newRequestResponse = await fetch(`${SINGlE_REQUEST_URL}${102129}`);

  if (!newRequestResponse.ok) {
    throw new Error('Ошибка получения информации о заявке');
  }

  const newRequestData = await newRequestResponse.json();

  return newRequestData;
});

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
      })
      .addCase(addNewRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests.push(action.payload);
      })
      .addCase(editRequest.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        // state.requests.push(action.payload);
      });
  },
});

export const selectAllRequests = (state: RootState) => state.requests.requests;
export const selectRequestById = (state: RootState, id: number) =>
  state.requests.requests.find((request) => request.id === id);
export const selectRequestsStatus = (state: RootState) => state.requests.status;
export const selectRequestsError = (state: RootState) => state.requests.error;

export default requestsSlice.reducer;
