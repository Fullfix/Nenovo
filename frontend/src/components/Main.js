import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import './main.css';
import Header from './Header/Header';
import Newest from './newest';
import Recom from './recom';
import Err404 from './Err404/Err404';
import CategoryPage from './CategoryPage/CategoryPage';

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        apiResponse: "",
        choosen: ""
      }
    }
    render() {
        return (
          <>
            <Header></Header>
            <div className="content">
              <Switch>
                <Route exact path={`/`} component={Newest}></Route>
                <Route exact path={`/category`} component={CategoryPage}></Route>
                <Route exact path={`/recommend`} component={Recom}></Route>
                <Route render={
                  () => 
                    <Redirect to="/"></Redirect>
                }></Route>
              </Switch>
            </div>
          </>
        );
    }
  }
  export default Main;