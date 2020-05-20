import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import './main.css'
import Header from './header'
import Newest from './newest'
import Category from './category'
import Recom from './recom'
import Err404 from './404'

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
                <Route exact path={`/category`} component={Category}></Route>
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