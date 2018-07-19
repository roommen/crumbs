import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom';
//import GoogleAPI from 'googleapis';
import NodeDropbox from 'node-dropbox';
import Button from '@material-ui/core/Button';
import './drive.css';

const APP_KEY = 'fma1a3ez6g7epwp';
const APP_SECRET = 'a56fadt6ap5l1pp';
const REDIRECT_URL = 'http://localhost:3001/drive/123';

export default class Drive extends Component {
  onClickLink(){
    // NodeDropbox.Authenticate(APP_KEY, APP_SECRET,REDIRECT_URL,(err,url) => {
    //   window.open(url);
    // })
    this.props.handleLink();
  }
  render() {
    const {handleLink, handleUnlink, history} = this.props;
    const drives = [
      //{title:'Google Drive', url:'/img/gdrive.png'},
      {title:'Dropbox', url:'/img/dropbox.png'}
    ];
    console.log(NodeDropbox);
    return (
      <div className="App-drive-container">
      <header className="drive-header">Link your Dropbox</header>
      <div style={{ display:'flex', justifyContent:'space-evenly' }}>        
        {
          drives.map((drive, idx) =>(
            <div key={idx} className="App-drive">
              <img src={drive.url} style={{height: 190}} alt={drive.title} />
              <Button
                style={{marginTop: 10}} 
                onClick={
                  () => this.onClickLink()
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
