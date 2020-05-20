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

const Category = () => {
    return (
        <h1>Дичь категоричная</h1>
    )
}
export default Category;