import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ALL_REQUESTS_URL, SINGlE_REQUEST_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { IRequest, StatusesType } from '@/types/types';

interface INewRequest {
  name: string;
  description: string;
}

export interface IEditRequest {
  id: number;
  statusId?: number;
  executorId?: number;
}

interface IInitialState {
  requests: IRequest[];
  status: StatusesType;
  error: null | string;
  editError: null | string;
}

const initialState: IInitialState = {
  requests: [],
  status: 'idle',
  error: null,
  editError: null,
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
      if (requests.status === 'loading') {
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
  IEditRequest,
  { state: RootState }
>('requests/editRequest', async (editRequestData) => {
  if (!editRequestData.executorId && !editRequestData.statusId) {
    return;
  }

  const response = await fetch(SINGlE_REQUEST_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editRequestData),
  });

  if (!response.ok) {
    throw new Error('Ошибка при редактировании заявки');
  }

  const newRequestResponse = await fetch(
    `${SINGlE_REQUEST_URL}${editRequestData.id}`
  );

  if (!newRequestResponse.ok) {
    throw new Error('Ошибка получения о измененной о заявке');
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
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка получения заявок';
      })
      .addCase(addNewRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests.push(action.payload);
      })
      .addCase(editRequest.fulfilled, (state, action) => {
        state.editError = null;
        const updatedRequestIndex = state.requests.findIndex(
          (request) => request.id === action.payload.id
        );
        state.requests[updatedRequestIndex] = action.payload;
      })
      .addCase(editRequest.rejected, (state, action) => {
        state.editError = action.error.message || 'Ошибка редактирования';
      });
  },
});

export const selectAllRequests = (state: RootState) => state.requests.requests;
export const selectRequestById = (state: RootState, id: number) =>
  state.requests.requests.find((request) => request.id === id);
export const selectRequestsStatus = (state: RootState) => state.requests.status;
export const selectRequestsError = (state: RootState) => state.requests.error;
export const selectRequestEditError = (state: RootState) =>
  state.requests.editError;

export default requestsSlice.reducer;
