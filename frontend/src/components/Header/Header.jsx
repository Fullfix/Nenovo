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
    let exitBut = "";
    if(Cookies.get('token') !== "") {
        exitBut = 
            <div className="logo-place lo exit">
                <p onClick={() => {
                    Cookies.set('token', "")
                    document.location.reload(true);
                }}>Выход</p>
            </div>
    }
    else {
        exitBut = ""
    }

    return (
        <header className="main-header">
            <div className="logo-place">
                <Link className="logo" to='/'><h1>НеНово</h1></Link>
            </div>
            <div className="logo-place lo">
                <Link to='./recommend' className="recom"><p id="rec">Рекомендации</p></Link>
            </div>
            <div className="logo-place lo">
                <Link to='./category' className="recom"><p id="cat">Категории</p></Link>
            </div>
            <div className="logo-place lo">
                <Link to='/' className="recom"><p id="res">Недавние</p></Link>
            </div>
            {exitBut}
            <Anime className='stick '
                translateX={() => {
                    let mode = window.location.href.split('/')[3];
                    if (mode === "") return getCoords(document.getElementById('res')).left - 20
                    else if (mode === "category") return getCoords(document.getElementById('cat')).left - 20
                    else if (mode === "recommend") return getCoords(document.getElementById('rec')).left - 20
                }}
                width={() => {
                    let mode = window.location.href.split('/')[3];
                    if (mode === "") return document.getElementById('res').clientWidth
                    else if (mode === "category") return document.getElementById('cat').clientWidth
                    else if (mode === "recommend") return document.getElementById('rec').clientWidth
                }}
            >
                <div></div>
            </Anime>
        </header>
    )
}

export default Header;