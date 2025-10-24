import { configureStore } from '@reduxjs/toolkit';
import requestsReducer from './features/requests/requestsSlice';
import executorsReducer from './features/executors/executorsSlice';
import statusesReducer from './features/statuses/statusesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      requests: requestsReducer,
      executors: executorsReducer,
      statuses: statusesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
