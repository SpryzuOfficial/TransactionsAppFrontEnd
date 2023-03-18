import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthStore } from '../../hooks/useAuthStore';
import './NavBar.css';
import Swal from 'sweetalert2';

export const NavBar = ({ status, username }) =>
{
    const navigate = useNavigate();
    const { startLogout } = useAuthStore();

    const onLogout = () =>
    {
        Swal.fire({ 
            icon: 'question', 
            text: 'Are you sure yo want to Log out?',
            showConfirmButton: true,
            showCancelButton: true,
            background: '#131b20',
            confirmButtonText: 'Log out',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'custom-container custom-container-success',
                cancelButton: 'custom-container custom-container-danger',
                htmlContainer: 'custom-container'
            }
        })
        .then(result =>
        {
            if(!result.isConfirmed) return;

            startLogout();
        });
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
                            <button onClick={() => navigate('/auth/signup')} className="navbar-button">Sign up</button>
                        </>
                    :
                        <>
                            <h1 className="navbar-element">{username}</h1>
                            <button onClick={ onLogout } className="navbar-button"><LogoutIcon /></button>
                        </>
                }
            </div>
        </div>
    )
}