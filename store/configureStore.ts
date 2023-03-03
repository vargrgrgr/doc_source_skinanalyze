import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { reduxStorage} from './reduxStorage'
import common from './common';
import user from './user';
import testResults from './test-results';
import cart from './cart';

const rootReducer = combineReducers({ common, user, testResults, cart });
export type RootState = ReturnType<typeof rootReducer>;

const storage = reduxStorage;



const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  whitelist: ['user', 'testResults', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
