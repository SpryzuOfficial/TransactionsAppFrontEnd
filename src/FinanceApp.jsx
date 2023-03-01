import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

export const FinanceApp = () =>
{
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}