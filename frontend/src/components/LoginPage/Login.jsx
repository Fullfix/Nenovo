import React, { useReducer, useEffect } from 'react';
import {
    Link,
    Redirect
} from "react-router-dom";
import { login } from '../../helpers/auth';

const loginReducer = (state, action) => {
    switch (action.type) {
        case 'email': return { ...state, email: action.value, errorMessage: null };
        case 'password': return { ...state, password: action.value, errorMessage: null };
        case 'login': return { ...state, isLogging: true };
        case 'finishLogging': {
            if (action.ok) return { ...state, isLogging: false, loginSuccess: true };
            return { ...state, isLogging: false, errorMessage: action.err };
        }
        case 'error': return { ...state, errorMessage: action.message };
        default: return state;
    }
}

const Login = (props) => {
    const initialState = {
        email: '',
        password: '',
        isLogging: false,
        errorMessage: null,
        loginSuccess: false,
    }
    const [state, dispatch] = useReducer(loginReducer, initialState);

    // LOGIN
    useEffect(() => {
        const loginUser = async () => {
            const { success, error } = await login(state.email, state.password);
            if (success) console.log('LOGGED IN SUCCESSFULLY');
            dispatch({
                type: 'finishLogging',
                ok: success,
                err: error,
            });
        }
        if (state.isLogging) loginUser();
    }, [state.email, state.password, state.isLogging]);

    return (
        <div className="logform">
            <header className="rightSide-header">
                <Link className="LogLink" to={`./register`}>Регистрация</Link>
                <h1 className="title">Логин</h1>
            </header>
            <form onSubmit={e => {
                e.preventDefault();
                dispatch({ type: 'login' });
            }}>
                <div className="LogLabel">
                    Электронная почта
                </div>
                <input className="LogInput" id="login" type="email" required
                value={state.email}
                onChange={(e) => dispatch({ 
                    type: 'email', 
                    value: e.target.value,
                })}></input>
                <div className="LogLabel">
                    Пароль
                </div>
                <input className="LogInput" id="password" type="password" required
                value={state.password}
                onChange={(e) => dispatch({ 
                    type: 'password',
                    value: e.target.value,
                })}></input>
                <button className="logBut" type="submit">Войти</button>
            </form>
            {state.errorMessage && <div className="error">{state.errorMessage}</div>}
        </div>
    );
}

export default Login;