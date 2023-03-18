import { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';

import { useReportsStore } from '../../hooks/useReportsStore';
import { useForm } from '../../helpers/useForm';
import './css/View.css';
import './css/BudgetView.css';

const initialForm = {
    newBudget: ''
}

export const BudgetView = () => 
{
    const { budget, income, expenses, startLoadBudget, startSetBudget,  startLoadIncome, startLoadExpenses } = useReportsStore();
    const { newBudget, onInputChange, onResetForm } = useForm(initialForm);

    const saveBudget = () =>
    {
        startSetBudget({ budget: parseInt(newBudget) });
        onResetForm();
    }

    useEffect(() =>
    {
        startLoadBudget();
        startLoadIncome();
        startLoadExpenses();
    }, [budget]);

    return (
        <Fade className="view view-mxw900">
            <div>
                <div className="view-panel">
                    <h1 className="view-panel-element">Monthly budget:</h1>
                    <span className="view-panel-element text-green">{`$${ budget ? budget : '0' }`}</span>
                    <input 
                        type="text" 
                        className="view-panel-element" 
                        placeholder="Monthly budget" 
                        name="newBudget" 
                        value={ newBudget } 
                        onChange={ onInputChange }
                    />
                    <button className="view-panel-element update-btn" onClick={ saveBudget }>Save</button>
                </div>

                <div className="budget-data">
                    <div>
                        <h2>Total income</h2>
                        <p className="text-green">{`$${ income ? income : '0' }`}</p>
                    </div>

                    <div>
                        <h2>Total expenses</h2>
                        <p className="text-red">{`$${ expenses ? expenses : '0' }`}</p>
                    </div>

                    <div>
                        <h2>Leftover</h2>
                        <p className={`${(income - expenses) > 0 ? 'text-green' : 'text-red' }`}>{`${((income - expenses) > 0 || (income - expenses) === 0) ? '' : '-' }$${ Math.abs(income - expenses) }`}</p>
                    </div>
                </div>
            </div>
        </Fade>
    )
}