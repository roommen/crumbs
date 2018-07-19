import React, { Component } from 'react';
import Header from './components/header/header';
import Body from './components/body/body';
import Checkbox from '@material-ui/core/Checkbox';
//import LoginHOC from 'react-facebook-login-hoc';
import './App.css';

// const configureLoginProps = {
//   scope: 'public_profile',
//   xfbml: true,
//   cookie: true,
//   version: 2.6,
//   language: 'en_US',
//   appId: '235159363948013'
// }

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      isLinked: true,
    };
    // this.status = this.props.fb.status
    // this.login = this.props.fb.login
    // this.logout = this.props.fb.logout
  }

  checkLoginStatus(){
     if(localStorage.getItem('userDetails')){
       return true;
     } else {
       return false;
     }
  }

  handleLogin(resp){
    //this.props.fb.login(this.getStatus.bind(this));
    localStorage.setItem('userDetails',JSON.stringify(resp));
    this.setState({isAuthenticated: true});
  }

  handleLogout(){
    //this.props.fb.logout();
    localStorage.clear();
    this.setState({isAuthenticated: false});
  }

  handleLink(){
    this.setState({isLinked: true});
  }

  handleUnlink(){
    this.setState({isLinked: false});
  }



  render() {
    const {isAuthenticated, isLinked} = this.state;
    // const authText = (!isAuthenticated) ? 'Login' : 'Logout';
    
    return (
      <div className="App">
        <Header 
          isAuthenticated={isAuthenticated} 
          isLinked={isLinked}
          checkLoginStatus={() => this.checkLoginStatus()}
          handleLogout={() => this.handleLogout()}
        />
        <Body
          isAuthenticated={isAuthenticated} 
          isLinked={isLinked}
          checkLoginStatus={() => this.checkLoginStatus()}
          handleLogin={(resp) => this.handleLogin(resp)}
          handleLogout={() => this.handleLogout()} 
          handleLink={() => this.handleLink()}
          handleUnlink={() => this.handleUnlink()}
         /> 
      </div>
    );
  }
}

export default App;

//export default LoginHOC(configureLoginProps)(App);
