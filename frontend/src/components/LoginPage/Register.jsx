import React, { useReducer, useEffect } from 'react';
import {
    Link,
    Redirect
} from "react-router-dom";
import { register } from '../../helpers/auth';

const registerReducer = (state, action) => {
    switch (action.type) {
        case 'email': return { ...state, email: action.value, errorMessage: null };
        case 'password': return { ...state, password: action.value, errorMessage: null };
        case 'password2': return { ...state, password2: action.value, errorMessage: null };
        case 'register': return { ...state, isRegistrating: true };
        case 'finishRegistrating': {
            if (action.ok) return { ...state, isRegistrating: false, registerSuccess: true };
            return { ...state, isRegistrating: false, errorMessage: action.err };
        }
        case 'error': return { ...state, errorMessage: action.message };
        default: return state;
    }
}

const Register = (props) => {
    const initialState = {
        email: '',
        password: '',
        password2: '',
        isRegistrating: false,
        errorMessage: null,
        registerSuccess: false,
    }
    const [state, dispatch] = useReducer(registerReducer, initialState);

    // REGISTER
    useEffect(() => {
        const registerUser = async () => {
            if (state.password !== state.password2) {
                return dispatch({
                    type: 'finishRegistrating',
                    ok: false,
                    err: 'Пароли не совпадают сука',
                })
            }
            const { success, error } = await register(state.email, state.password);
            if (success) console.log('SIGNED UP SUCCESSFULLY');
            dispatch({
                type: 'finishRegistrating',
                ok: success,
                err: error,
            });
        }
        if (state.isRegistrating) registerUser();
    }, [state.email, state.password, state.password2, state.isRegistrating]);

    if (state.registerSuccess) return (
        <Redirect to="/"/>
    )

    return (
        <div className="logform">
            <header className="rightSide-header">
                <Link className="LogLink" to='./login'>Логин</Link>
                <h1 className="title">Регистрация</h1>
            </header>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: 'register' });
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
                <div className="LogLabel">
                    Подтвердите пароль
                </div>
                <input className="LogInput" id="pod-password" type="password" required
                value={state.password2}
                onChange={(e) => dispatch({ 
                    type: 'password2',
                    value: e.target.value,
                })}></input>
                <button className="logBut" type="submit">Зарегестрироваться</button>
            </form>
            {state.errorMessage && <div className="error">{state.errorMessage}</div>}
        </div>
    );
}

export default Register;