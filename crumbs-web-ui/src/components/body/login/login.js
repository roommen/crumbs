import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './login.css';

export default class Login extends Component { 
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  render() {
    const {handleLogin} = this.props;
    return (
      <div>
        <p>Login</p>
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
          <Button variant="contained" size="small" color="default">
            BACK
          </Button>
          <Button variant="contained" size="small" color="primary" onClick={() => handleLogin()}>
            LOGIN
          </Button>
        </div>
      </div>
    );  
  }
}
