import React from 'react';
import {
    Link,
    Redirect
  } from "react-router-dom";
import Cookies from 'js-cookie'

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
    }
    onSubmit() {
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        console.log('sho za dich')
        if (login === "" || password === ""){
          this.setState({apiResponse: "Not"})
        }
        else {
        fetch('http://localhost:3001/api/user/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: login,
                password: password
            })
          })
          .then(res => res.json()).then(res => {
            if(JSON.parse(JSON.stringify(res)).error !== undefined)
              this.setState({apiResponse: JSON.parse(JSON.stringify(res)).error.reason})
            if(res.status){
              this.setState({apiResponse: "OK"})
              Cookies.set('token', res.response['session-token'], {expires: 1})
            }
          })
          .catch(err => {
              console.log(err)
          });
        }
    }
  
    render() {
      let Error;
      if (this.state.apiResponse === "User with this email does not exist") Error = "Пользователя с такой электронной почтой не существует."
      else if (this.state.apiResponse === "Invalid password") Error = "Вы ввели неверный пароль."
      else if (this.state.apiResponse === "Not") Error = "Не все поля заполнены"
      else if (this.state.apiResponse === "OK") Error = <Redirect to={`/`}></Redirect>;
        return (
            <div className="logform">
                  <header className="rightSide-header">
                      <Link className="LogLink" to={`./register`}>Регистрация</Link>
                      <h1 className="title">Логин</h1>
                  </header>
                  <form>
                      <label className="LogLabel" for="login">
                          Электронная почта
                          <input className="LogInput" id="login" type="email">

                          </input>
                      </label>
                      <label className="LogLabel" for="password">
                          Пароль
                          <input className="LogInput" id="password" type="password">

                          </input>
                      </label>
                      <button className="logBut" type="button" onClick={() => this.onSubmit()}>Войти</button>
                  </form>
                  <div className="error">{Error}</div>
            </div>
        );
    }
  }
  export default Login;