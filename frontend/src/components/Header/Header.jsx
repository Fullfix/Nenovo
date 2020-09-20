import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect,
    useLocation
} from "react-router-dom";
import Anime from 'react-anime'

const coordsMap = {
    '/': {
        translateX: 0,
        width: 92,
    },
    '/articles': {
        translateX: 140,
        width: 80,
    }
}

const Header = () => {
    const { pathname } = useLocation();
    console.log(pathname);

    return (
        <header className="main-header">
            <div className="logo-place">
                <Link className="logo" to='/'><h1>НеНово</h1></Link>
            </div>
            <div className="logo-place lo">
                <Link to='/articles' className="recom"><p id="articles">Новости</p></Link>
            </div>
            <div className="logo-place lo user">
                <p>Профиль</p>
            </div>
            <Link to='/profile' className="user-div">
                <img src="/user.png" alt="user" className="user-img" />
            </Link>
            <Anime className='stick '
            {...coordsMap[pathname]}
            >
            </Anime>
        </header>
    )
}

export default Header;