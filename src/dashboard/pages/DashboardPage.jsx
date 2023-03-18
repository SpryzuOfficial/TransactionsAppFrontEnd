import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';

import { NavBar } from './../components/NavBar';
import { BudgetView, CategoriesView, TransactionsView, SettingsView } from '../views/';
import { useAuthStore } from '../../hooks/useAuthStore';
import './DashboardPage.css';

export const DashboardPage = () => 
{
    const { user } = useAuthStore();
    const { username } = user;

    const [view, setView] = useState('trans');
    
    return (
        <Fade>
            <NavBar status="authenticated" username={ username } />
            
            {/* <div className="user-panel">
                <h1 className="user-panel-element">Welcome {username}</h1>
            </div> */}

            <div className="pages-buttons">
                <button onClick={() => setView('trans')} className={`page-buttons-btn ${view === 'trans' ? 'page-buttons-btn-selected' : ''}`}>Transactions</button>
                <button onClick={() => setView('cat')} className={`page-buttons-btn ${view === 'cat' ? 'page-buttons-btn-selected' : ''}`}>Categories</button>
                <button onClick={() => setView('rep')} className={`page-buttons-btn ${view === 'rep' ? 'page-buttons-btn-selected' : ''}`}>Reports</button>
                <button onClick={() => setView('set')} className={`page-buttons-btn ${view === 'set' ? 'page-buttons-btn-selected' : ''}`}>Settings</button>
            </div>

            <div className="view-card">
                {
                    (view === 'trans')
                    ? <TransactionsView />
                    : (view === 'cat')
                    ? <CategoriesView />
                    : (view === 'rep')
                    ? <BudgetView />
                    : (view === 'set')
                    ? <SettingsView />
                    : <></>
                }
            </div>
        </Fade>
    )
}