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
import Cookies from 'js-cookie'
import { logout } from '../../helpers/auth';
import { useRef } from 'react';

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
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    const { pathname } = useLocation();
    console.log(pathname)
    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    return (
        <header className="main-header">
            <div className="logo-place">
                <Link className="logo" to='/'><h1>НеНово</h1></Link>
            </div>
            <div className="logo-place lo">
                <Link to='/articles' className="recom"><p id="articles">Новости</p></Link>
            </div>
            <div className="logo-place lo exit">
                <p onClick={() => {
                    logout();
                    window.location.href = '/auth/login';
                }}>Выход</p>
            </div>
            <Anime className='stick '
            {...coordsMap[pathname]}
            >
            </Anime>
        </header>
    )
}

export default Header;