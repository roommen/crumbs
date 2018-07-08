import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Drive from './drive/drive';
import Group from './group/group';

export default class Body extends Component {
  render() {
    const {isAuthenticated, isLinked, handleLink, handleLogin, handleLogout, handleUnlink} = this.props;
    return (
      <div className="App-body">
        <Switch> 
          <Route 
           exact
           path="/"
           render={
             props => {
               if(isAuthenticated){
                 if(isLinked){
                  return <Redirect to="/home" />
                 } else {
                  return <Redirect to="/drive/123" />
                 }
               } else {
                 return <Redirect to="/login" />
               }
             }
           }
          />
          <Route 
           exact 
           path="/login" 
           //component={Login}
           render={
             props => 
             <Login
              {...props} 
              isAuthenticated={isAuthenticated} 
              isLinked={isLinked}
              handleLogin={() => handleLogin()}
              handleLogout={() => handleLogout()} 
              handleLink={() => handleLink()}
              handleUnlink={() => handleUnlink()}
             />
            } 
          />
          <Route 
            path="/home" 
            //component={Home}
            render={
              props => 
              <Home
              {...props}
              isAuthenticated={isAuthenticated} 
              isLinked={isLinked}
              handleLogin={() => handleLogin()}
              handleLogout={() => handleLogout()} 
              handleLink={() => handleLink()}
              handleUnlink={() => handleUnlink()} 
              />
             }  
          />
          <Route 
           path="/drive/:driveID" 
           //component={Drive}
           render={
            props => 
            <Drive
              {...props}
              isAuthenticated={isAuthenticated} 
              isLinked={isLinked}
              handleLogin={() => handleLogin()}
              handleLogout={() => handleLogout()} 
              handleLink={() => handleLink()}
              handleUnlink={() => handleUnlink()}
            />
           }  
          />
          <Route 
           path="/group/:groupID" 
           //component={Group} 
           render={
            props =>
            <Group 
              {...props}
              isAuthenticated={isAuthenticated} 
              isLinked={isLinked}
              handleLogin={() => handleLogin()}
              handleLogout={() => handleLogout()} 
              handleLink={() => handleLink()}
              handleUnlink={() => handleUnlink()}
            />
           } 
          />
          <Route />         
        </Switch>
      </div>      
    )
  }
}
