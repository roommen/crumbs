import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import './login.css';

export default class Login extends Component { 
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
    };
  }

  onLogin(){
    const {isLinked, history} = this.props;
    const {state} = this;
    //alert(state.password);
    if(isLinked){
      history.push('/home');
    } else {
      history.push('/drive/123');
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
      <TextField
        id="user-name"
        label="Enter your username" 
        value={this.state.username}
        onChange={evt => this.setState({username: evt.target.value})}      
        margin="normal"
      />
      <Divider />
      <TextField
        id="password"
        label="Enter your password"
        type="password"
        value={this.state.password}
        onChange={evt => this.setState({password: evt.target.value})}
        margin="normal"
      />
      <Divider />
      <Button 
        style={{marginTop: 10}} 
        onClick={
          () => this.onLogin()
        } 
        variant="contained" 
        color="primary"
      >
        Authenticate
        <Icon style={{paddingLeft:20}}>lock</Icon>
      </Button>
      </form>
    );  
  }
}
