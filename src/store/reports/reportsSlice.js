import { createSlice } from '@reduxjs/toolkit';

export const reportsSlice = createSlice({
    name: 'reports',
    initialState: {
        budget: 0,
        income: 0,
        expenses: 0
    },
    reducers: {
        onInitialReports: (state) =>
        {
            state.budget = 0;
            state.income = 0;
            state.expenses = 0;
        },
        onLoadBudget: (state, { payload }) =>
        {
            state.budget = payload;
        },
        onLoadIncome: (state, { payload }) =>
        {
            state.income = payload;
        },
        onLoadExpenses: (state, { payload }) =>
        {
            state.expenses = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onInitialReports, onLoadBudget, onLoadIncome, onLoadExpenses } = reportsSlice.actions;