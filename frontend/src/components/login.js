import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { json } from 'body-parser';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
    }
  
    async callAPI() {
        let resp
        fetch("http://localhost:3001")
            .then((response) => {  
              if (response.status !== 200) {  
                console.log('Looks like there was a problem. Status Code: ' +  
                  response.status);  
                return;  
              }
              response.text().then((data) => {  
                this.setState({apiResponse: data})  
              });  
            })  
            .catch(function(err) {  
              console.log('Fetch Error :-S', err);  
            });
    }
  
    componentDidMount() {
        this.callAPI();
    }
    onSubmit() {
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        fetch('http://localhost:3001/user/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'fqffq@fwfw.ry',
                password: 'weffew'
            })
          })
          .then(res => res.json()).then(res => console.log(res))
          .catch(err => {
              console.log(err)
          });
    }
  
    render() {
        let resp = this.state.apiResponse === "" ? 'Ошибочка вышла' : this.state.apiResponse;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="title">Логин</h1>
                </header>
                <form>
                    <label for="login">
                        Логин
                        <input id="login" type="text">

                        </input>
                    </label>
                    <label for="password">
                        Пароль
                        <input id="password" type="password">

                        </input>
                    </label>
                    <button type="button" onClick={() => this.onSubmit()}>Войти</button>
                </form>
                <h2><strong>Фигня которая вышла из апи '/'</strong></h2>
                <p className="App-intro">{resp}</p>
            </div>
        );
    }
  }
  export default Login;