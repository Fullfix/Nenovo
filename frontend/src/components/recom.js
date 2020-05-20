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

const Recom = () => {
    const token = Cookies.get('token')
    if (token === "") return(
        <Redirect to='/auth'></Redirect>
    )
    
    return (
        <h1>Дичь рекомендованная</h1>
    )
}
export default Recom;