import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './main.css'
import Header from './header'

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
          <div></div>
          </>
        );
    }
  }
  export default Main;