import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from './components/login'
import Main from './components/login'

const App = () => {
        return(
            <Router>
                <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Login} />
                </Switch>
            </Router>
        )
}

export default App;
