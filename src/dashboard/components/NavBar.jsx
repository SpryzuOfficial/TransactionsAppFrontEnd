import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthStore } from '../../hooks/useAuthStore';
import './NavBar.css';

export const NavBar = ({ status }) =>
{
    const navigate = useNavigate();
    const { startLogout } = useAuthStore();

    const onLogout = () =>
    {
        startLogout();
    }

    return (
        <div className="navbar">
            <h1 className="navbar-title">Finance App</h1>

            <div className="navbar-buttons">
                {
                    (status === 'not-authenticated')
                    ?
                        <>
                            <button onClick={() => navigate('/auth/login')} className="navbar-button">Log in</button>
                            <button onClick={() => navigate('/auth/signin')} className="navbar-button">Sign in</button>
                        </>
                    :
                        <button onClick={ onLogout } className="navbar-button"><LogoutIcon /></button>
                }
            </div>
        </div>
    )
}