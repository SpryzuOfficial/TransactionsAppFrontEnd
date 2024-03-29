import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onInitialCategories, onInitialReports, onInitialTransactions, onLogin, onLogout, setErrorMessage } from '../store';
import financeApi from '../api/financeApi';

export const useAuthStore = () =>
{
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ id, email, password }, strict=true) =>
    {
        if(strict) dispatch(onChecking());
        
        try 
        {
            const { data } = await financeApi.post('/auth/login', { id, email, password });
            const { user } = data;

            if(strict)
            {
                localStorage.setItem('token', data.token);
    
                dispatch(onLogin({ username: user.username, uid: user._id }));

                return;
            }
            return true;
        } 
        catch (error)
        {
            if(strict)
            {
                dispatch(onLogout('Invalid Email or Password'));

                setTimeout(() =>
                {
                    dispatch(clearErrorMessage());
                }, 10);
            }
            else
            {
                dispatch(setErrorMessage('Wrong password'));
                return false;
            }
        }
    }

    const startSignup = async({ username, email, password }) =>
    {
        dispatch(onChecking());

        try 
        {
            const { data } = await financeApi.post('/auth/register', { username, email, password });
            const { user } = data;

            localStorage.setItem('token', data.token);

            dispatch(onLogin({ username: user.username, uid: user._id }));
        } 
        catch ({ response }) 
        {
            if(response.data.errors)
            {
                dispatch(onLogout(response.data.errors[0].msg));
            }
            else
            {
                dispatch(onLogout(response.data.msg));
            }

            setTimeout(() =>
            {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startLogout = () =>
    {
        dispatch(onLogout());
        dispatch(onInitialTransactions());
        dispatch(onInitialCategories());
        dispatch(onInitialReports());
        localStorage.clear();
    }

    const startUpdateUser = async(newUser) =>
    {
        try 
        {
            const { data } = await financeApi.post('/auth/edit', newUser);
            const { user } = data;

            localStorage.setItem('token', data.token);

            dispatch(onLogin({ username: user.username, uid: user._id }));
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    const checkAuthToken = async() =>
    {
        const token = localStorage.getItem('token');

        if(!token) return dispatch(onLogout());

        try
        {
            const { data } = await financeApi.get('/auth/renew');

            localStorage.setItem('token', data.token);

            dispatch(onLogin({ username: data.username, uid: data.uid }));
        } 
        catch (error)
        {
            console.log(error)
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startSignup,
        startLogout,
        startUpdateUser,
        checkAuthToken
    }
}