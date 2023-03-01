import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { NavBar } from '../../dashboard/components/NavBar';
import { useForm } from '../../helpers/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import './AuthPage.css';

const formFields = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const SigninPage = () => 
{
    const { errorMessage, startSignin } = useAuthStore();
    const { username, email, password, confirmPassword, onInputChange } = useForm(formFields);

    const formSubmit = (event) =>
    {
        event.preventDefault();

        if(password !== confirmPassword)
        {
            Swal.fire({
                icon: 'error',
                text: 'Password do not match',
                background: '#131b20',
                confirmButtonText: 'Try again',
                customClass: {
                    confirmButton: 'custom-container',
                    htmlContainer: 'custom-container'
                }
            });

            return;
        }

        startSignin({ username, email, password });
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
        <>
            <NavBar status="not-authenticated" />

            <h1 className="form-title">Sign In</h1>
            <form className="form-card" onSubmit={formSubmit}>
                <input 
                    autoComplete="off"
                    type="text" 
                    placeholder="Username" 
                    className="form-element"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                />

                <input
                    autoComplete="off"
                    type="text" 
                    placeholder="Email" 
                    className="form-element"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                />

                <input
                    type="password"
                    placeholder="Password" 
                    className="form-element"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />
                
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="form-element" 
                    name="confirmPassword"
                    value={ confirmPassword }
                    onChange={ onInputChange }
                />

                <button className="form-element">Sign In</button>
            </form>
        </>
    )
}