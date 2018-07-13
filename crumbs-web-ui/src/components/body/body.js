import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Drive from './drive/drive';
import Group from './group/group';

const PrivateRoute = ({ component:Component, isAuthenticated, isLinked,checkLoginStatus, ...rest }) => 
(
  <Route
    {...rest}
    render={
      (props) => 
      (checkLoginStatus() === true)
      ?(isLinked === true)
        ?<Component {...props} {...rest} isAuthenticated={isAuthenticated} isLinked={isLinked} />
        :<Redirect 
          to="/drive/123" 
         />
      : <Redirect 
          to="/login"
        />
    }
  />
);

const PrivateDriveRoute = ({ component:Component, isAuthenticated, isLinked,checkLoginStatus, ...rest }) => 
(
  <Route
    {...rest}
    render={
      (props) => 
      (checkLoginStatus() === true)
      ?(isLinked === true)
       ?<Redirect 
          to="/home"
        />
       :<Component {...props} {...rest} isAuthenticated={isAuthenticated} isLinked={isLinked} />
      :<Redirect 
          to="/login"
        />
    }
  />
);

export default class Body extends Component {
  render() {
    const {isAuthenticated, isLinked, handleLink, checkLoginStatus, handleLogin, handleLogout, handleUnlink} = this.props;
    return (
      <div className="App-body">        
        <Switch> 
          <Route 
           exact
           path="/"
           render={
             props => {
               if(checkLoginStatus()){
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
           render={
             props => {
              if(checkLoginStatus()){
                if(isLinked){
                 return <Redirect to="/home" />
                } else {
                 return <Redirect to="/drive/123" />
                }
              } else {
                return <Login
                    {...props} 
                    isAuthenticated={isAuthenticated} 
                    checkLoginStatus={() => checkLoginStatus()}
                    isLinked={isLinked}
                    handleLogin={(resp) => handleLogin(resp)}
                    handleLogout={() => handleLogout()} 
                    handleLink={() => handleLink()}
                    handleUnlink={() => handleUnlink()}
                />
              }
             }            
            } 
          />
          <PrivateRoute 
            exact
            path="/home" 
            component={Home}
            isAuthenticated={isAuthenticated} 
            isLinked={isLinked}
            checkLoginStatus={() => checkLoginStatus()}
            handleLogout={() => handleLogout()} 
            handleLink={() => handleLink()}
            handleUnlink={() => handleUnlink()}            
          />
          <PrivateDriveRoute 
           path="/drive/:driveID" 
           component={Drive}
           isAuthenticated={isAuthenticated} 
           isLinked={isLinked}
           checkLoginStatus={() => checkLoginStatus()}
           handleLogout={() => handleLogout()} 
           handleLink={() => handleLink()}
           //handleUnlink={() => handleUnlink()}
          />
          <PrivateRoute 
            path="/group/:groupID" 
            component={Group} 
            isAuthenticated={isAuthenticated} 
            isLinked={isLinked}
            checkLoginStatus={() => checkLoginStatus()}
            handleLogout={() => handleLogout()} 
            handleLink={() => handleLink()}
            handleUnlink={() => handleUnlink()}
          />
          <Route />         
        </Switch>
      </div>      
    )
  }
}
