import { createSlice } from '@reduxjs/toolkit';

export const reportsSlice = createSlice({
    name: 'reports',
    initialState: {
        budget: 0,
        income: 0,
        expenses: 0
    },
    reducers: {
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
export const { onLoadBudget, onLoadIncome, onLoadExpenses } = reportsSlice.actions;