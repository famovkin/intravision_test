import { configureStore } from '@reduxjs/toolkit';
import executorsReducer from './features/executors/executorsSlice';
import prioritiesReducer from './features/priorities/prioritiesSlice';
import requestsReducer from './features/requests/requestsSlice';
import singleRequestReducer from './features/singleRequest/singleRequestSlice';
import statusesReducer from './features/statuses/statusesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      requests: requestsReducer,
      singleRequest: singleRequestReducer,
      executors: executorsReducer,
      statuses: statusesReducer,
      priorities: prioritiesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
