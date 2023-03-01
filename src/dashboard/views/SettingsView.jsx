import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { useForm } from '../../helpers/useForm';
import { useAuthStore } from '../../hooks/useAuthStore'
import './css/View.css'

const initialForm = {
    username: '',
    password: '',
    oldPassword: ''
}

export const SettingsView = () => 
{
    const { user, errorMessage, startLogin, startUpdateUser } = useAuthStore();
    const { username, password, oldPassword, onInputChange } = useForm(initialForm);

    const updatePassword = () =>
    {
        startLogin({ id: user.uid, email: 'exp@exp.com', password: oldPassword }, false);

        if(errorMessage !== undefined) return;

        startUpdateUser({ password });
    }

    const updateUsername = () =>
    {
        startUpdateUser({ username });
    }

    useEffect(() =>
    {
        if(errorMessage !== undefined)
        {
            Swal.fire({
                icon: 'error',
                text: errorMessage,
                background: '#131b20',
                confirmButtonText: 'Try again',
                customClass: {
                    confirmButton: 'custom-container',
                    htmlContainer: 'custom-container'
                }
            });
        }
    }, [errorMessage]);

    return (
        <div className="view view-mxw1000">
            <div className="view-panel view-panel-grid">
                <h1 className="view-panel-element view-panel-element-grid">User Settings</h1>
                <p className="view-panel-element view-panel-element-grid">Username</p>
                <input 
                    autoComplete="off" 
                    type="text"
                    className="view-panel-element view-panel-element-grid" 
                    placeholder="New username"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                />
                <button className="view-panel-element view-panel-element-grid" onClick={ updateUsername }>Change username</button>
                <p className="view-panel-element view-panel-element-grid">Password</p>
                <input 
                    autoComplete="off" 
                    type="password"
                    className="view-panel-element view-panel-element-grid" 
                    placeholder="Old password" 
                    name="oldPassword"
                    value={ oldPassword }
                    onChange={ onInputChange }
                />
                <input 
                    autoComplete="off" 
                    type="password"
                    className="view-panel-element view-panel-element-grid" 
                    placeholder="New password"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />
                <button className="view-panel-element view-panel-element-grid" onClick={ updatePassword }>Change Password</button>
            </div>
        </div>
    )
}