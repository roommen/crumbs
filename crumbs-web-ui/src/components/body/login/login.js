import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login';
import './login.css';

export default class Login extends Component { 
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
    };
  }

  
  onLogin(resp){
    const {isAuthenticated, isLinked, history, handleLogin, checkLoginStatus} = this.props;
    const {state} = this;
    console.log(resp);
    if(resp.status === 'unknown'){
      console.log('Unknown User');
    } else {
      handleLogin(resp);
    }    
  }

  render() {
    return (
      <form 
      className="form-container"
      noValidate 
      autoComplete="off"
      >
        <header className="login-header">Facebook Authentication</header>
        <br/>
        <Divider />
        <br/>
        <FacebookLogin
          appId="235159363948013"
          autoLoad={false}
          fields="name,email"
          onClick={() =>console.log('Clicked')}
          callback={resp => this.onLogin(resp)}
        /> 
      </form>
    );  
  }
}
