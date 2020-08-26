import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import Main from './components/Main'
import { initAxios } from './helpers/auth';

const App = () => {
    initAxios();
    return (
        <Router>
            <Switch>
                <Route strict path="/auth" component={LoginPage} />
                <Route path="/" component={Main} />
            </Switch>
        </Router>
    )
}

export default App;
