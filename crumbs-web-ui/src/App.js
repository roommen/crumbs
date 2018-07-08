import React, { Component } from 'react';
import Header from './components/header/header';
import Body from './components/body/body';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: true,
      isLinked: true,
    };
  }

  handleLogin(){
    this.setState({isAuthenticated: true});
  }

  handleLogout(){
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
        <Header />
        <Body
          isAuthenticated={isAuthenticated} 
          isLinked={isLinked}
          handleLogin={() => this.handleLogin()}
          handleLogout={() => this.handleLogout()} 
          handleLink={() => this.handleLink()}
          handleUnlink={() => this.handleUnlink()}
         /> 
      </div>
    );
  }
}

export default App;
