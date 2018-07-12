import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/PersonAdd';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack'
import DownloadIcon from '@material-ui/icons/FileDownload';
import UploadIcon from '@material-ui/icons/FileUpload';
import ShareIcon from '@material-ui/icons/Share';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import ImageIcon from '@material-ui/icons/Image';
import MusicIcon from '@material-ui/icons/MusicVideo';
import FileIcon from '@material-ui/icons/AttachFile';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle';
import './group.css';

const capitalize = str => str.toUpperCase()

const typeMap = {
  doc: <FileIcon />,
  image:<ImageIcon />,
  sound:<MusicIcon />,
  video:<VideoIcon />,
};

const extensionMap = {
  'application/pdf' :'doc'
};

export default class Group extends Component {
  constructor(props){
    super(props);
    this.state={
      members: [],
      users:[],
      files:[
        {
          id:6876865,
          name:'DesignGuidelines.pdf',
          type:'doc',
          size: 6.4,
        },
        {
          id:23443546,
          name:'FlowDiagram.png',
          type:'image',
          size: 3.4,
        },
        {
          id:9897877,
          name:'HighFreq.mp3',
          type:'sound',
          size: 0.7,
        },
        {
          id:76453644,
          name:'SuperNova.mp4',
          type:'video',
          size: 2.5,
        }
      ],
      isAdmin: true,
      isOpen: false,
    }
  }

  componentDidMount(){
    fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
      this.setState({
        members: data.results.slice(0,3),
        users: data.results.slice(3),
        invitees:[],
        isOpen: false,
      })
    })
  }

  inviteMember(){
    let newstate = this.state;
    newstate.members.push(...newstate.invitees);
    newstate.isOpen = false;
    this.setState(newstate);
  }

  handleFileUpload(){
    let newstate = this.state;
    let fileObj = this.newFile.files[0];
    newstate.files.push({
      id: fileObj.size,
      name: fileObj.name,
      size: (fileObj.size/1000).toFixed(2),
      type: extensionMap[fileObj.type]
    });
    this.setState(newstate);
  }

  handleToggle(val,user){
     let newstate = this.state;
     if(val){
       newstate.invitees.push(user);
     } else {
       let index = newstate.invitees.indexOf(user);
       newstate.invitees.splice(index,1);
     }
     this.setState(newstate);
  }

  render() {
    const {members, users, invitees, isAdmin} = this.state;
    return (
      <div className="App-group-container">
        <Dialog
          open={this.state.isOpen}
          onClose={() => this.setState({isOpen:false})}
         >
          <DialogTitle>INVITE MEMBERS</DialogTitle>
          <Divider />
          <DialogContent>
            <List>
            {
            users.map(
              (user,id) => (
                <ListItem key={id} dense button>
                <Avatar alt="img" src={user.picture.large} />
                <ListItemText primary={`${user.name.first} ${user.name.last}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    value={invitees.includes(user)}
                    onChange={val => this.handleToggle(val,user)}                    
                  />
                </ListItemSecondaryAction>
              </ListItem>
              )
            )
          }
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({isOpen:false})} color="primary">
              CLOSE
            </Button>
            <Button onClick={() => this.inviteMember()} color="primary" autoFocus>
              INVITE
            </Button>
          </DialogActions>
        </Dialog>
        <header className="group-header">
          <div 
            style={{cursor:'pointer'}} 
            onClick={() => this.props.history.push('/home')}
          >
            <ArrowBack />
          </div>
            {
              (isAdmin)?
              <Chip
                label="ADMIN"
                className="admin-badge"                      
              />:
              null
            }          
          <div>TEAM 456</div>          
          <div style={{display:'flex', cursor:'pointer'}}>
            {
              members.map(
                (member,id) => (
                  <Avatar
                    key={id} 
                    alt={capitalize(`${member.name.first} ${member.name.last}`)} 
                    title={capitalize(`${member.name.first} ${member.name.last}`)}
                    src={member.picture.large}
                    className="group-member" 
                  />
                )
              )
            }
             
            {
              (isAdmin)?
              <Button 
                variant="fab" 
                color="primary" 
                aria-label="add" 
                className="create-group"
                onClick={() => this.setState({isOpen:true})}
              >
                <AddIcon />
              </Button>:
              null
            }
          </div>
        </header>
        {/* <div className="group-list"> */}
          <List>
          {
            this.state.files.map(
              (file,id) => (
                <div key={id} >
                 <ListItem button>
                   <ListItemIcon>
                    {typeMap[file.type]}
                   </ListItemIcon>
                   <ListItemText primary={file.name} secondary={`${file.size} MB`} />  
                   <ListItemIcon onClick={() => alert('Downloaded')}>
                    <DownloadIcon />
                   </ListItemIcon>
                   <ListItemIcon>
                    <ShareIcon />
                   </ListItemIcon>                                
                 </ListItem>                  
                 <Divider />
              </div>
              )              
            )
          }
          </List>
          <input
            id="upload-file"
            ref={newFile => this.newFile = newFile}
            multiple
            type="file"
            onChange={() => this.handleFileUpload()}
            style={{display:'none'}}
          />
          <label htmlFor="upload-file">
            <Button variant="contained" component="span" color="primary">
              Upload File
              <UploadIcon />
            </Button>
          </label>
      </div>
    )
  }
}
