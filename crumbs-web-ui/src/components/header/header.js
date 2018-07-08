import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import './header.css';

export default class Header extends Component {
  render() {
    return (
        <header className="App-header">
          <img src="/img/crumbs_logo.png" className="App-logo" alt="CRUMBS" />
          <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <NavLink to="/login" style={{color:'white', textDecoration:'none',fontWeight:'bold'}} activeStyle={{backgroundColor:'white',padding:4, color:'#103688', textDecoration:'none',fontWeight:'bold'}} >LOGIN</NavLink>
            <NavLink to="/home" style={{color:'white', textDecoration:'none',fontWeight:'bold'}} activeStyle={{backgroundColor:'white',padding:4, color:'#103688', textDecoration:'none',fontWeight:'bold'}} >HOME</NavLink>
            <NavLink to="/drive/123" style={{color:'white', textDecoration:'none',fontWeight:'bold'}} activeStyle={{backgroundColor:'white',padding:4, color:'#103688', textDecoration:'none',fontWeight:'bold'}} >DRIVE</NavLink>
            <NavLink to="/group/456" style={{color:'white', textDecoration:'none',fontWeight:'bold'}} activeStyle={{backgroundColor:'white',padding:4, color:'#103688', textDecoration:'none',fontWeight:'bold'}} >GROUP</NavLink>
          </div>
        </header>
    )
  }
}
