import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import Login from './components/login'
import LoginPage from './components/loginPage'
import Main from './components/main'

const App = () => {
    
    return(
        <Router>
            <Switch>
            <Route path="/auth" component={LoginPage} />
            <Route path="/" component={Main} />
            </Switch>
        </Router>
    )
}

export default App;
