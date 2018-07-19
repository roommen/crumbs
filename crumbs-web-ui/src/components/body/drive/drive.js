import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom';
import GoogleAPI from 'googleapis';
import NodeDropbox from 'node-dropbox';
import Button from '@material-ui/core/Button';
import './drive.css';


export default class Drive extends Component {
  render() {
    const {handleLink, handleUnlink, history} = this.props;
    const drives = [
      //{title:'Google Drive', url:'/img/gdrive.png'},
      {title:'Dropbox', url:'/img/dropbox.png'}
    ];
    return (
      <div className="App-drive-container">
      <header className="drive-header">Choose your drives</header>
      <div style={{ display:'flex', justifyContent:'space-evenly' }}>        
        {
          drives.map((drive, idx) =>(
            <div key={idx} className="App-drive">
              <img src={drive.url} style={{height: 190}} alt={drive.title} />
              <Button
                style={{marginTop: 10}} 
                onClick={
                  () => handleLink()
                } 
                variant="contained" 
                color="primary"
              >
              LINK
              </Button>
            </div>
          ))
        }
      </div>
      </div>
    )
  }
}
