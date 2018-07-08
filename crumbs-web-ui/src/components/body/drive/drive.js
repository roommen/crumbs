import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class Drive extends Component {
  render() {
    const {handleLink, handleUnlink, history} = this.props;
    return (
      <div>
        <p>Drive</p>
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
          <Button variant="contained" size="small" color="default" onClick={() => handleUnlink()}>
            UNLINK
          </Button>
          <Button 
           variant="contained" 
           size="small" 
           color="primary" 
           onClick={
             () => {
             history.push('/home');
            }
            }>
            LINK
          </Button>
        </div>
      </div>
    )
  }
}
