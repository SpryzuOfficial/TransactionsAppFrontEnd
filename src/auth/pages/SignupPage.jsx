import { useEffect } from 'react';

import { NavBar } from '../../dashboard/components/NavBar';
import { swalExecute } from '../../helpers/swalExecute';
import { useForm } from '../../helpers/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import './AuthPage.css';

const formFields = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const SignupPage = () => 
{
    const { errorMessage, startSignup } = useAuthStore();
    const { username, email, password, confirmPassword, onInputChange } = useForm(formFields);

    const formSubmit = (event) =>
    {
        event.preventDefault();

        if(!swalExecute((password !== confirmPassword), 'Passwords do not match', false)) return;

        startSignup({ username, email, password });
    }

    useEffect(() =>
    {
        swalExecute((errorMessage !== undefined), errorMessage, false);
    }, [errorMessage]);

    return (
        <>
            <NavBar status="not-authenticated" />
            <div className="animate__animated animate__fadeIn">

                <h1 className="form-title">Sign Up</h1>
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

                    <button className="form-element">Sign Up</button>
                </form>
            </div>
        </>
    )
}