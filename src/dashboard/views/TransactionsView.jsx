import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { TransactionItem } from '../components/TransactionItem';
import { useCategoriesStore } from '../../hooks/useCategoriesStore';
import { useTransactionsStore } from '../../hooks/useTransactionsStore';
import { swalExecute } from '../../helpers/swalExecute';
import { useForm } from '../../helpers/useForm';
import './css/View.css';
import './css/List.css';

const formFields = {
    title: '',
    amount: '',
    categoryName: '',
    spentSign: ''
}

export const TransactionsView = () => 
{
    const { transactions, startAddNewTransaction, startLoadTransactions } = useTransactionsStore();
    const { categories, startLoadCategories } = useCategoriesStore();
    const { title, amount, categoryName, spentSign, onInputChange } = useForm(formFields);

    const addTransaction = () =>
    {
        if(!swalExecute((!title), 'Transaction title is required', false)) return;
        if(!swalExecute((spentSign !== '-' && spentSign !== '+'), 'Transaction sign is required', false)) return;
        if(!swalExecute((!amount), 'Transaction amount is required', false)) return;
        if(!swalExecute((isNaN(amount)), 'Transaction amount must be a number', false)) return;

        let flag = false;
        categories.forEach(storeCategory => 
        {
            if(storeCategory.name === categoryName)
            {
                const category = { id: storeCategory.id, name: categoryName };
                startAddNewTransaction({ name: title, amount, category, isSpent: spentSign === '-' ? true : false });
                
                flag = true;
            }
        });

        if(!swalExecute((!flag), 'Transaction category is required', false)) return;
    }

    useEffect(() =>
    {
        startLoadTransactions();
        startLoadCategories();
    }, []);

    return (
        <div className="view view-mxw1000">
            <div className="view-panel view-panel-grid">
                <h1 className="view-panel-element view-panel-element-grid">Transactions</h1>
                <input
                    autoComplete="off" 
                    type="text" 
                    className="view-panel-element view-panel-element-grid" 
                    placeholder="Title"
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                <div className="view-panel view-panel-element-grid">
                    <select className="view-panel-element view-panel-element-width" id="sign" name="spentSign" value={ spentSign } onChange={ onInputChange }>
                        <option>Sign</option>
                        <option>-</option>
                        <option>+</option>
                    </select>
                    <input
                        autoComplete="off" 
                        type="text" 
                        className="view-panel-element view-panel-element-width" 
                        placeholder="Amount"
                        name="amount"
                        value={ amount }
                        onChange={ onInputChange }
                    />
                </div>
                <select className="view-panel-element view-panel-element-grid" id="categories" name="categoryName" value={ categoryName } onChange={ onInputChange }>
                    <option key="1">Category</option>
                    {
                        categories.map(({ id, name }) =>
                        {
                            return <option key={ id }>{ name }</option>
                        })
                    }
                </select>
                <button className="view-panel-element view-panel-element-grid" onClick={ addTransaction }><AddIcon /></button>
            </div>
            
            {
                transactions.length > 0
                ?
                <ol className="list">
                    {
                        transactions.map(transaction =>
                        {
                            return <TransactionItem key={ transaction._id } transaction={ transaction } />
                        })
                    }
                </ol>
                : <></>
            }
        </div>
    )
}