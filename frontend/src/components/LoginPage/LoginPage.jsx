import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect
  } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import './LogReg.css';
import { isAuthenticated } from '../../helpers/auth';

const LoginPage = () => {
    let { path, url } = useRouteMatch();
    console.log('AUTHED', isAuthenticated())
    if (isAuthenticated()) return (
        <Redirect to="/" />
    )
    return(
        <div className="loginPage">
            <div className="leftSide">
                <Link className="left-title" to='/'><h1 >НеНово</h1></Link>
                <div className="left-description">
                    <p>
                        <span style={{fontSize: '2em'}}>Входя или <span style={{color: 'white'}}>регистрируясь</span> на сайт, </span>
                        вы получаете возможность видеть <span style={{color: 'white'}}>рекомендации,</span> а также настраивать <span style={{color: 'white'}}>ключевые слова </span>
                        по интересам 
                    </p>
                </div>
            </div>
            <div className="rightSide">
                <Switch>
                    <Route exact path={`${path}/login`} component={Login} />
                    <Route exact path={`${path}/register`} component={Register} />
                    <Route path="/auth">
                        <Redirect to={`${path}/login`}></Redirect>
                    </Route>
                </Switch>
            </div>
        </div>
        
    )
}

export default LoginPage;
