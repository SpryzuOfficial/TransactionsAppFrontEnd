import { useEffect } from 'react';

import { NavBar } from '../../dashboard/components/NavBar';
import { swalExecute } from '../../helpers/swalExecute';
import { useForm } from '../../helpers/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import './AuthPage.css';

const formFields = {
    email: '',
    password: ''
}

export const LoginPage = () => 
{
    const { errorMessage, startLogin } = useAuthStore();
    const { email, password, onInputChange } = useForm(formFields);
    
    const formSubmit = (event) =>
    {
        event.preventDefault();
        
        startLogin({ email, password });
    }

    useEffect(() =>
    {
        swalExecute((errorMessage !== undefined), errorMessage, false);
    }, [errorMessage]);

    return (
        <>
            <NavBar status="not-authenticated" />
            <div className="animate__animated animate__fadeIn">
                <h1 className="form-title">Log In</h1>
                <form className="form-card" onSubmit={formSubmit}>
                    <input type="text"
                        autoComplete="off"
                        placeholder="Email" 
                        className="form-element"
                        name="email"
                        value={ email }
                        onChange={ onInputChange }
                    />

                    <input
                        autoComplete="off"
                        type="password" 
                        placeholder="Password" 
                        className="form-element"
                        name="password"
                        value={ password } 
                        onChange={ onInputChange }
                    />

                    <button className="form-element">Log In</button>
                </form>
            </div>
        </>
    )
}