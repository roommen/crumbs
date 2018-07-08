import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class Home extends Component {
  render() {
    const {handleLogout} = this.props;
    return (
      <div>
        <p>Home</p>
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
          <Button variant="contained" size="small" color="default" onClick={() => handleLogout()}>
            LOGOUT
          </Button>
          <Button variant="contained" size="small" color="primary" onClick={() => <Redirect to="/group/108" />}>
            GROUP
          </Button>
        </div>
      </div>
    )
  }
}
