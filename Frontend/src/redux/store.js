import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import storage from 'redux-persist/lib/storage'; // Use local storage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
