import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './header.css';

export default class Header extends Component {
  constructor(props){
     super(props);
     this.state = {};
  }

  render() {
    const {isAuthenticated, handleLogout} = this.props;
    return (
        <header className="App-header">
          <img src="/img/crumbs_logo.png" className="App-logo" alt="CRUMBS" />
          {
            (isAuthenticated)
            ?<div style={{display:'flex', justifyContent:'flex-start', padding: 60}}>
              <Button 
                style={{marginTop: 10}} 
                onClick={
                  () => handleLogout()
                } 
                variant="contained" 
                color="secondary"
              >
                LOGOUT
              </Button>
            </div>
            :null
        }
        </header>
    )
  }
}
