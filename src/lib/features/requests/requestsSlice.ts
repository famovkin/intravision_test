import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { ALL_REQUESTS_URL } from '@/lib/constants';
import { RootState } from '@/lib/store';
import { IRequest, StatusesType } from '@/types/types';

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
      if (requests.status === 'loading') {
        return false;
      }
      return true;
    },
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addNewRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateEditedRequest: (state, action) => {
      const { id } = action.payload;
      const updatedRequestIndex = state.requests.findIndex(
        (request) => request.id === id
      );
      if (updatedRequestIndex === -1) return;

      state.requests[updatedRequestIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка получения заявок';
      });
  },
});

export const selectAllRequests = (state: RootState) => state.requests.requests;
export const selectRequestsStatus = (state: RootState) => state.requests.status;
export const selectRequestsError = (state: RootState) => state.requests.error;

export const { addNewRequest, updateEditedRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
