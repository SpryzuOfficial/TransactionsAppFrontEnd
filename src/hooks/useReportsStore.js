import { useDispatch, useSelector } from 'react-redux';
import financeApi from '../api/financeApi';
import { onLoadBudget, onLoadExpenses, onLoadIncome } from '../store';

export const useReportsStore = () =>
{
    const { budget, income, expenses } = useSelector(store => store.reports);
    const dispatch = useDispatch();
    
    const startLoadBudget = async() =>
    {
        try 
        {
            const { data } = await financeApi.get('reports/budget');
            const { budget } = data;

            dispatch(onLoadBudget(budget));
        }
        catch (error) 
        {
            console.log(error);    
        }
    }

    const startSetBudget = async({ budget }) =>
    {
        try 
        {
            await financeApi.post('reports/budget/set', { budget });

            dispatch(onLoadBudget(budget));
        }
        catch (error) 
        {
            console.log(error);    
        }
    }

    const startLoadIncome = async() =>
    {
        try 
        {
            const { data } = await financeApi.get('reports/income');
            const { income } = data;

            dispatch(onLoadIncome(income));
        }
        catch (error) 
        {
            console.log(error);    
        }
    }

    const startLoadExpenses = async() =>
    {
        try 
        {
            const { data } = await financeApi.get('reports/expenses');
            const { expenses } = data;

            dispatch(onLoadExpenses(expenses));
        }
        catch (error) 
        {
            console.log(error);    
        }
    }

    return {
        budget, 
        income, 
        expenses,
        startLoadBudget,
        startSetBudget,
        startLoadIncome,
        startLoadExpenses
    }
}