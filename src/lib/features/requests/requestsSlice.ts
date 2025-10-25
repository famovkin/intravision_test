import { RootState } from '@/lib/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PrioritiesName } from '../priorities/prioritiesSlice';

const TENANT_GUID = '995bce8c-fed5-43e8-a86d-2785286240f0';
const API_PATH = 'http://intravision-task.test01.intravision.ru/';
const ALL_REQUESTS_URL = `${API_PATH}odata/tasks?tenantguid=${TENANT_GUID}`;
const SINGlE_REQUEST_URL = `${API_PATH}api/${TENANT_GUID}/Tasks/`;

interface ITag {
  id: number;
  name: string;
}

export type RgbType = `#${string}`;

const editRequestExample = {
  id: 102129,
  comment: 'string',
  statusId: 76284,
  tags: [70240],
  executorId: 58143,
};

const newRequestExample = {
  name: 'Заказать завтрак',
  description: 'Хлопья, кофе, круассан',
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
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
    body: JSON.stringify(newRequest),
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
export const selectRequestsStatus = (state: RootState) => state.requests.status;
export const selectRequestsError = (state: RootState) => state.requests.error;

export default requestsSlice.reducer;
