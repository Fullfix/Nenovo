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
import RecentPage from './RecentPage/RecentPage';
import Recom from './recom';
import Err404 from './Err404/Err404';
import CategoryPage from './ArticlePage/ArticlePage';
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
                    <Route exact path={`/`} component={RecentPage}></Route>
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