import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import Anime, { anime } from 'react-anime'
import Cookies from 'js-cookie'
import { logout } from '../../helpers/auth';

const Header = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);
    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    }

    return (
        <header className="main-header">
            <div className="logo-place">
                <Link className="logo" to='/'><h1>НеНово</h1></Link>
            </div>
            <div className="logo-place lo">
                <Link to='./articles' className="recom"><p id="cat">Новости</p></Link>
            </div>
            <div className="logo-place lo exit">
                <p onClick={() => {
                    logout();
                    window.location.href = '/auth/login';
                }}>Выход</p>
            </div>
            <Anime className='stick '
                translateX={() => {
                    let mode = window.location.href.split('/')[3];
                    if (mode === "articles") return getCoords(document.getElementById('cat')).left - 20
                }}
                width={() => {
                    let mode = window.location.href.split('/')[3];
                    if (mode === "articles") return document.getElementById('cat').clientWidth
                }}
            >
                <div></div>
            </Anime>
        </header>
    )
}

export default Header;