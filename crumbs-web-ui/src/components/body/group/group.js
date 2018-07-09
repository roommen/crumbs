import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './group.css';

const capitalize = str => str.toUpperCase()

let files = [
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
];

export default class Group extends Component {
  constructor(props){
    super(props);
    this.state={
      members: [],
      isAdmin: true,
    }
  }

  componentDidMount(){
    fetch('https://randomuser.me/api/?results=3')
    .then(response => response.json())
    .then(data => {
      this.setState({
        members: data.results
      })
    })
  }

  render() {
    const {members, isAdmin} = this.state;
    return (
      <div className="App-group-container">
        <header className="group-header">
          <div>TEAM 456</div>
          <div style={{display:'flex', cursor:'pointer'}}>
            {
              members.map(
                (member,id) => (
                  <Avatar 
                    alt={capitalize(`${member.name.title} ${member.name.first} ${member.name.last}`)} 
                    title={capitalize(`${member.name.title} ${member.name.first} ${member.name.last}`)}
                    src={member.picture.large}
                    className="group-member" 
                  />
                )
              )
            }
          </div>
        </header>
        <div className="group-list">
          {/* <List>
          {
            files.map(
              (file,id) => (
                <div className="group-hover" style={{cursor:'pointer'}}>
                 <ListItem key={id}>
                    <Avatar>
                      <Group />
                    </Avatar>
                    <ListItemText primary={file.name} secondary={`${file.size} MB`} /> 
                    {
                      (isAdmin)?
                      <Chip
                        label="ADMIN"
                        className="admin-badge"                      
                      />:
                      null
                    }                 
                  </ListItem>                  
                  <Divider />
                </div>
              )
            )
          }
          </List> */}
        </div>
      </div>
    )
  }
}
