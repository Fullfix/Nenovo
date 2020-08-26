import React from 'react';
import {
        BrowserRouter as Router,
        Switch,
        Route,
        Link,
        Redirect
    } from "react-router-dom";
import './main.css';
import Header from './Header/Header';
import Newest from './newest';
import Recom from './recom';
import Err404 from './Err404/Err404';
import CategoryPage from './CategoryPage/CategoryPage';
import axios from 'axios';
import { isAuthenticated } from '../helpers/auth';

const Main = (props) => {
    console.log('AUTHED:', isAuthenticated());
    if (!isAuthenticated()) return (
        <Redirect to="/auth/login" />
    )
    return (
        <>
            <Header></Header>
            <div className="content">
                <Switch>
                    <Route exact path={`/`} component={Newest}></Route>
                    <Route exact path={`/category`} component={CategoryPage}></Route>
                    <Route exact path={`/recommend`} component={Recom}></Route>
                    <Route render={
                        () => 
                            <Redirect to="/"></Redirect>
                    }></Route>
                </Switch>
            </div>
        </>
    );
}

export default Main;