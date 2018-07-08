import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Drive from './drive/drive';
import Group from './group/group';

export default class Body extends Component {
  render() {
    const {isAuthenticated, isLinked, handleLink, handleLogin, handleLogout, handleUnlink} = this.props;

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            (rest.isAuthenticated)?
            (rest.isLinked) ?
            <Component 
              {...props} 
              isLinked={isLinked}
              handleLogin={() => handleLogin()}
              handleLogout={() => handleLogout()} 
              handleLink={() => handleLink()}
              handleUnlink={() => handleUnlink()}  
            />:
            <Redirect 
             to='/drive/108' 
            />:
            <Login
              {...props}
              isLinked={isLinked}
              handleLogin={() => handleLogin()}
              handleLogout={() => handleLogout()} 
              handleLink={() => handleLink()}
              handleUnlink={() => handleUnlink()}  
            />
        )} />
    );

    const PrivateDriveRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
          (isAuthenticated)?
          <Component 
           {...props} 
           isLinked={isLinked}
            handleLogin={() => handleLogin()}
            handleLogout={() => handleLogout()} 
            handleLink={() => handleLink()}
            handleUnlink={() => handleUnlink()}  
          />:
          <Login
            isLinked={isLinked}
            handleLogin={() => handleLogin()}
            handleLogout={() => handleLogout()} 
            handleLink={() => handleLink()}
            handleUnlink={() => handleUnlink()}  
          />
      )} 
    />
  );

    return (
      <div>
        <Switch> 
            <PrivateRoute 
                exact
                path="/"                
                component={Home}
                isAuthenticated={isAuthenticated} 
                isLinked={isLinked}
                handleLogin={() => handleLogin()}
                handleLogout={() => handleLogout()} 
                handleLink={() => handleLink()}
                handleUnlink={() => handleUnlink()} 
            />
            <PrivateRoute 
                path="/home" 
                component={Home}
                isAuthenticated={isAuthenticated} 
                isLinked={isLinked}
                handleLogin={() => handleLogin()}
                handleLogout={() => handleLogout()} 
                handleLink={() => handleLink()}
                handleUnlink={() => handleUnlink()} 
            />
            <PrivateDriveRoute 
                path="/drive/:userID" 
                component={Drive} 
                isAuthenticated={isAuthenticated} 
                isLinked={isLinked}
                handleLogin={() => handleLogin()}
                handleLogout={() => handleLogout()} 
                handleLink={() => handleLink()}
                handleUnlink={() => handleUnlink()}
            />
            <PrivateRoute 
                path="/group/:groupID" 
                component={Group} 
                isAuthenticated={isAuthenticated} 
                isLinked={isLinked}
                handleLogin={() => handleLogin()}
                handleLogout={() => handleLogout()} 
                handleLink={() => handleLink()}
                handleUnlink={() => handleUnlink()}
            />        
          </Switch>
      </div>
    )
  }
}
