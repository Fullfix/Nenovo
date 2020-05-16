import React from 'react';
import {
    Link,
    Redirect
  } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
    }
    onSubmit() {
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        let Podpassword = document.getElementById('pod-password').value;
        if (password !== Podpassword) this.setState({apiResponse: "No"})
        else if (login === "" || password === "" || Podpassword === ""){
            this.setState({apiResponse: "Not"})
        }
        else{
        console.log('sho za dich')
        fetch('http://localhost:3001/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: login,
                password: password,
                keyword: []
            })
          })
          .then(res => res.json()).then(res => {
            if(JSON.parse(JSON.stringify(res)).error !== undefined)
              this.setState({apiResponse: JSON.parse(JSON.stringify(res)).error.reason})
            if(res.status)
            this.setState({apiResponse: "OK"})
          })
          .catch(err => {
              console.log(err)
          });
        }
    }
  
    render() {
        let Error;
        if (this.state.apiResponse === "No") Error = "Пароли не совпадают."
        else if (this.state.apiResponse === "Not") Error = "Не все поля заполнены"
        else if (this.state.apiResponse === "Invalid passwrd. Must contain 6-20 numbers, 1 numeric and 1 uppercase digit") Error = "Неверный пароль, пароль должен содержать 6-20 символов, одну цифру и одну большую букву."
        else if (this.state.apiResponse === "OK") Error = <Redirect to='./login'></Redirect>;
        return (
            <div className="logform">
                  <header className="rightSide-header">
                      <Link className="LogLink" to='./login'>Логин</Link>
                      <h1 className="title">Регистрация</h1>
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
                      <label className="LogLabel" for="pod-password">
                          Подтвердите пароль
                          <input className="LogInput" id="pod-password" type="password">

                          </input>
                      </label>
                      <button className="logBut" type="button" onClick={() => this.onSubmit()}>Зарегестрироваться</button>
                  </form>
                  <div className="error">{Error}</div>
            </div>
        );
    }
  }
  export default Register;