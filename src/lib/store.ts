import { configureStore } from '@reduxjs/toolkit';
import requestsReducer from './features/requests/requestsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      requests: requestsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
