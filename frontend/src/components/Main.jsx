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
import ArticleList from './ArticlePage/ArticlePage';
import axios from 'axios';
import Settings from './Settings/Settings';
import { useState } from 'react';
import { useEffect } from 'react';
import UserContext from '../contexts/UserContext';

const Main = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('USER');
    console.log(user);

    const changeKeywords = async (keywords) => {
        try {
            const res = await axios.put('/api/user/changekeywords', {
                keywords,
            });
            console.log(res.data);
            user.data.keyWords = res.data.response;
            return { keywords: res.data.response };
        } catch (err) {
            console.log(err);
            return { error: err.response.data.error.reason };
        }
    }
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/user/me');
                setUser(res.data.response);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setUser(null);
                setLoading(false);
            }
        }
        if (loading) fetchUser();
    }, [loading]);

    if (loading) return (
        <div>LOADING...</div>
    )

    if (!user) return (
        <Redirect to="/auth/login" />
    )
    return (
        <UserContext.Provider value={{
            user: user,
            changeKeywords
        }}>
            <Header />
            <div className="content">
                <Switch>
                    <Route exact path={`/articles`} component={ArticleList}></Route>
                    <Route exact path={`/settings`} component={Settings}></Route>
                    <Route render={
                        () => 
                            <Redirect to="/articles"></Redirect>
                    }></Route>
                </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default Main;