import { createSlice } from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: []
    },
    reducers: {
        onAddNewTransaction: (state, { payload }) =>
        {
            state.transactions.push(payload);
        },
        onDeleteTransaction: (state, { payload }) =>
        {
            state.transactions = state.transactions.filter(transaction => transaction._id !== payload);
        },
        onLoadTransactions: (state, { payload }) =>
        {
            payload.forEach(transaction =>
            {
                const exists = state.transactions.some(dbTransaction => dbTransaction._id === transaction._id);
                
                if(!exists)
                {
                    state.transactions.push(transaction);
                }
            });
        }
    }
});

export const { onAddNewTransaction, onUpdateTransaction, onDeleteTransaction, onLoadTransactions } = transactionsSlice.actions;