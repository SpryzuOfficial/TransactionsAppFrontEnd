import { useEffect } from 'react';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';

import { TransactionItem } from '../components/TransactionItem';
import { useCategoriesStore } from '../../hooks/useCategoriesStore';
import { useTransactionsStore } from '../../hooks/useTransactionsStore';
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
        if(spentSign !== '-' && spentSign !== '+')
        {
            Swal.fire({
                icon: 'error',
                text: 'Sign is required',
                background: '#131b20',
                confirmButtonText: 'Try again',
                customClass: {
                    confirmButton: 'custom-container',
                    htmlContainer: 'custom-container'
                }
            });

            return;
        }

        categories.forEach(storeCategory => 
        {
            if(storeCategory.name === categoryName)
            {
                const category = { id: storeCategory.id, name: categoryName };
                startAddNewTransaction({ name: title, amount, category, isSpent: spentSign === '-' ? true : false });
            }
        });
    }

    useEffect(() =>
    {
        startLoadTransactions();
        startLoadCategories();
    }, []);

    return (
        <div className="view view-mxw1000">
            <div className="view-panel">
                <h1 className="view-panel-element">Transactions</h1>
                <input
                    autoComplete="off" 
                    type="text" 
                    className="view-panel-element" 
                    placeholder="Title"
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                <select className="view-panel-element" id="sign" name="spentSign" value={ spentSign } onChange={ onInputChange }>
                    <option>Sign</option>
                    <option>-</option>
                    <option>+</option>
                </select>
                <input
                    autoComplete="off" 
                    type="text" 
                    className="view-panel-element" 
                    placeholder="Amount"
                    name="amount"
                    value={ amount }
                    onChange={ onInputChange }
                />
                <select className="view-panel-element" id="categories" name="categoryName" value={ categoryName } onChange={ onInputChange }>
                    <option key="1">Category</option>
                    {
                        categories.map(({ id, name }) =>
                        {
                            return <option key={ id }>{ name }</option>
                        })
                    }
                </select>
                <button className="view-panel-element" onClick={ addTransaction }><AddIcon /></button>
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