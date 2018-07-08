import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class Home extends Component {
  render() {
    const {handleLogout} = this.props;
    return (
      <div>
        <p>Home</p>
      </div>
    )
  }
}
