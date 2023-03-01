import { configureStore } from '@reduxjs/toolkit';
import { authSlice, categoriesSlice, reportsSlice, transactionsSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        categories: categoriesSlice.reducer,
        transactions: transactionsSlice.reducer,
        reports: reportsSlice.reducer,
    }
});