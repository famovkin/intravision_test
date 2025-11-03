import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SINGlE_REQUEST_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { IRequest, StatusesType } from '@/types/types';
import { addNewRequest, updateEditedRequest } from '../requests/requestsSlice';

interface INewRequest {
  name: string;
  description: string;
}

interface IEditRequest {
  id?: number;
  statusId?: number;
  executorId?: number;
  comment?: string;
}

interface IRequestChanges {
  statusId?: number;
  executorId?: number;
}

interface IInitialState {
  request: IRequest | null;
  changes: IRequestChanges;
  status: StatusesType;
  error: null | string;
  editError: null | string;
}

const initialState: IInitialState = {
  request: null,
  changes: {},
  status: 'idle',
  error: null,
  editError: null,
};

export const fetchSingleRequest = createAsyncThunk<
  IRequest,
  string,
  { state: RootState }
>(
  'singleRequest/fetchSingleRequest',
  async (id) => {
    const response = await fetch(`${SINGlE_REQUEST_URL}${id}`);

    if (!response.ok) {
      throw new Error('Ошибка получения заявки');
    }

    const res = await response.json();

    return res;
  },
  {
    condition: (_, { getState }) => {
      const { singleRequest } = getState();
      if (singleRequest.status === 'loading') {
        return false;
      }
      return true;
    },
  }
);

export const createSingleRequest = createAsyncThunk<
  IRequest,
  INewRequest,
  { state: RootState }
>('singleRequest/createSingleRequest', async (newRequest, thunkAPI) => {
  const response = await fetch(SINGlE_REQUEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newRequest,
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
  thunkAPI.dispatch(addNewRequest(newRequestData));
  return newRequestData;
});

export const editRequest = createAsyncThunk<
  IRequest,
  IEditRequest,
  { state: RootState }
>('requests/editRequest', async (editRequestData, thunkAPI) => {
  if (!editRequestData.executorId && !editRequestData.statusId) {
    return;
  }

  const response = await fetch(SINGlE_REQUEST_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editRequestData),
  });

  if (!response.ok) {
    throw new Error('Ошибка редактировании заявки');
  }

  const newRequestResponse = await fetch(
    `${SINGlE_REQUEST_URL}${editRequestData.id}`
  );

  if (!newRequestResponse.ok) {
    throw new Error('Ошибка получения о измененной о заявке');
  }

  const newRequestData = await newRequestResponse.json();
  thunkAPI.dispatch(updateEditedRequest(newRequestData));
  return newRequestData;
});

const singleRequestSlice = createSlice({
  name: 'singleRequest',
  initialState,
  reducers: {
    updateRequestChanges: (state, action) => {
      state.changes = { ...state.changes, ...action.payload };
    },
    resetChanges: (state) => {
      state.changes = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.request = action.payload;
      })
      .addCase(fetchSingleRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка получения заявки';
      })
      .addCase(createSingleRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.request = action.payload;
      })
      .addCase(editRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.editError = null;
        state.request = action.payload;
      })
      .addCase(editRequest.rejected, (state, action) => {
        state.editError = action.error.message || 'Ошибка редактирования';
      });
  },
});

export const selectSingleRequest = (state: RootState) =>
  state.singleRequest.request;
export const selectRequestChanges = (state: RootState) =>
  state.singleRequest.changes;
export const selectSingleRequestStatus = (state: RootState) =>
  state.singleRequest.status;
export const selectSingleRequestError = (state: RootState) =>
  state.singleRequest.error;
export const selectSingleRequestEditError = (state: RootState) =>
  state.singleRequest.editError;

export const { updateRequestChanges, resetChanges } =
  singleRequestSlice.actions;

export default singleRequestSlice.reducer;
