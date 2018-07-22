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
//import GoogleAPI from 'googleapis';
//import NodeDropbox from 'node-dropbox';
//import SplitFile from 'split-file';
//import SplitFile from "js-split-file/browser";
//import MergeFiles from 'merge-files';
import './group.css';

const capitalize = str => str.toUpperCase()

const typeMap = {
  doc: <FileIcon />,
  image:<ImageIcon />,
  sound:<MusicIcon />,
  video:<VideoIcon />,
  gen:<FileIcon />,
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
      files:[],
      isAdmin: true,
      isOpen: false,
    }
  }

  componentDidMount(){
    const {groupID} = this.props.match.params;
    fetch('http://localhost:1990/groups/'+groupID+'/users')
    .then(response => response.json())
    .then(data => {
      fetch('http://localhost:1990/groups/'+groupID+'/files')
      .then(response => response.json())
      .then(files => {
        this.setState({
          members: data,
          files:files.map(file => ({
            id: file.file_id,
            name: file.file_name,
            type: file.file_type,
            size:file.file_size,
          })),
          invitees:[],
          isOpen: false,
        })
      })
    })
  }

  onOpen(){
    fetch('https://randomuser.me/api/?results=5')
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        isOpen:true,
        users: data.results
      });
    })
  }

  inviteMember(){
    let newstate = this.state;
    let mappedInvitees = newstate.invitees.map(
      (user,idx) => ({
         user_id: (newstate.members.length + idx),
         uname: user.login.username,
         fname: user.name.first,
         lname: user.name.last,
         user_pic: user.picture.large,
         drive:'D',
         token:'gcfct54rtd'
      })
    );
    newstate.members.push(...mappedInvitees);
    newstate.isOpen = false;
    this.setState(newstate);
  }

  handleFileUpload(evt){
     let fileObj = this.newFile.files[0];
     fetch('http://localhost:1990/users/saveChunkInfo',{
        method:'POST',
        mode:'no-cors',
        body:JSON.stringify({
          file: fileObj.name,
          fileURL: 'C:\\temp\\'+fileObj.name,
          size: fileObj.size,
          members: this.state.members,
          groupID: this.props.match.params.groupID
        })
     })
     .then(resp => { 
       fetch('http://localhost:1990/groups/'+this.props.match.params.groupID+'/files')
      .then(response => response.json())
      .then(files => {
        this.setState({
           files:files.map(file => ({
            id: file.file_id,
            name: file.file_name,
            type: file.file_type,
            size:file.file_size,
          })),
          isOpen: false,
        })
      })
    })
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

  onDownload(filename, fileID, groupID){
    fetch(`http://localhost:1990/groups/${groupID}/downloadFile/${fileID}`)
    .then(resp =>resp.json())
    .then(data => {
      alert('Downloaded the file:::'+filename);
    });
  }

  render() {
    const {members, users, invitees, isAdmin} = this.state;
    console.log('Group Screen props',this.props); 
    const currentUser = this.props.location.state.metadata.user;
    const currentGroup = this.props.location.state.metadata.group;
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
              (currentGroup.admin)?
              <Chip
                label="ADMIN"
                className="admin-badge"                      
              />:
              null
            }          
          <div>{currentGroup.group_name}</div>          
          <div style={{display:'flex', cursor:'pointer'}}>
            {
              members.map(
                (member,id) => (
                  <Avatar
                    key={id} 
                    alt={capitalize(`${member.fname} ${member.lname}`)} 
                    title={capitalize(`${member.fname} ${member.lname}`)}
                    src={member.user_pic}
                    className="group-member" 
                  />
                )
              )
            }
             
            {
              (currentGroup.admin)?
              <Button 
                variant="fab" 
                color="primary" 
                aria-label="add" 
                className="create-group"
                onClick={() => this.onOpen()}
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
                   <ListItemIcon 
                   onClick={
                     () => this.onDownload(file.name, file.id, this.props.match.params.groupID)
                    }
                   >
                    <DownloadIcon />
                   </ListItemIcon>
                   {/* <ListItemIcon>
                    <ShareIcon />
                   </ListItemIcon>
                   */}
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
            onChange={evt => this.handleFileUpload(evt)}
            style={{display:'none'}}
          />
          <label htmlFor="upload-file">
            <Button variant="contained" title="Please upload from a temporary location" component="span" color="primary">
              Upload File
              <UploadIcon />
            </Button>
          </label>
      </div>
    )
  }
}
