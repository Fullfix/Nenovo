import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import LoginPage from './components/loginPage'
import Main from './components/main'
import Err404 from './components/404'

const App = () => {
    return(
        <Router>
            <Switch>
            <Route strict path="/auth" component={LoginPage} />
            <Route path="/" component={Main} />
            </Switch>
        </Router>
    )
}

export default App;
