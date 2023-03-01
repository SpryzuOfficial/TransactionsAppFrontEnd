import { useDispatch, useSelector } from 'react-redux';

import financeApi from '../api/financeApi';
import { onAddNewTransaction, onDeleteTransaction, onLoadTransactions } from '../store';

export const useTransactionsStore = () =>
{
    const { transactions } = useSelector(store => store.transactions);
    const dispatch = useDispatch();

    const startAddNewTransaction = async({ name, amount, category, isSpent }) =>
    {
        try
        {
            const { data } = await financeApi.post('transactions/add', { name, amount, category, isSpent });
            const { transaction } = data;

            dispatch(onAddNewTransaction(transaction));
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    const startDeleteTransaction = async({ id }) =>
    {
        try 
        {
            const { data } = await financeApi.delete('transactions', { data: { id } });

            dispatch(onDeleteTransaction(id));
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    const startLoadTransactions = async() =>
    {
        try 
        {
            const { data } = await financeApi.get('transactions');
            const { transactions } = data;

            dispatch(onLoadTransactions(transactions));
        } 
        catch (error) 
        {
            
        }
    }

    return {
        transactions,
        startAddNewTransaction,
        startDeleteTransaction,
        startLoadTransactions
    }
}