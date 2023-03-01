import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardPage } from '../dashboard/pages/DashboardPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { LoginPage, SignupPage } from '../auth/pages/';

import '../styles.css';

export const AppRouter = () => 
{
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => 
    {
        checkAuthToken();
    }, []);

    if(status === 'checking')
    {
        return (
            <h3 className="checking">Loading...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                ? (
                    <>
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/signup" element={<SignupPage />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
                    )
                : (
                    <>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/*" element={<Navigate to="/dashboard" />} />
                    </>
                    )
            }
        </Routes>
    )
}