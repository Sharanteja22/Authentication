import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js'; // ✅ Default import

export const store = configureStore({
    reducer: { user: userReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
