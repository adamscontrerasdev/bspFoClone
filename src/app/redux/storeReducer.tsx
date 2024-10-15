// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { generalSlice } from './slices/generealSlice';
import { userApi } from './service/music';
import { favoritesApi } from './service/music'; // Asegúrate de importar tu favoritesApi

export const store = configureStore({
    reducer: {
        general: generalSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer, // Agrega el reducer de favoritesApi
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, favoritesApi.middleware), // Agrega el middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
