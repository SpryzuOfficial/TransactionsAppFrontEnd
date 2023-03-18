import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { useTransactionsStore } from '../../hooks/useTransactionsStore';
import '../views/css/List.css';

export const TransactionItem = ({ transaction }) => 
{
    const [isDelete, setIsDelete] = useState(false);
    const { startDeleteTransaction } = useTransactionsStore();

    const { _id, name, amount, category, isSpent, date } = transaction;
    const { name: categoryName } = category;

    const dateObj = new Date(parseInt(date));

    const deleteTransaction = () =>
    {
        setIsDelete(true);
        startDeleteTransaction({ id: _id });
    }

    return (
        <li className={`list-element animate__animated animate__fadeInUp ${isDelete ? 'animate__fadeOutLeft' : ''}`}>
            <p>{ name }</p>
            <p className={`${isSpent ? 'text-red' : 'text-green'}`}>{`${isSpent ? '-' : '+'}$${ amount }`}</p>
            <p>Date: { dateObj.toLocaleDateString('en-US') }</p>
            <p className="category-element">{ categoryName }</p>
            <button className="list-element-btn delete-style" onClick={ deleteTransaction }><DeleteIcon /></button>
        </li>
    )
}