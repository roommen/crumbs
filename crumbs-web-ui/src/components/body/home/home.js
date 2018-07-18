import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Group from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './home.css';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state ={
      isOpen: false,
      newGroupName:'',
      user: null,
      groups:[],
    };
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('userDetails'));
    fetch('http://localhost:1990/users/'+ user.name.split(' ')[0]+'/all')
    .then(resp =>{ 
      //alert('Done!!');
      return resp.json()
    })
    .then(data => {      
      this.setState({
        user: data
        .map(item => ({
          user_id: item.user_id,
          uname: item.uname,
          fname: item.fname,
          user_pic: item.user_pic,
          lname: item.lname,
          drive: item.drive,
          token: item.token,
        }))[0],
        groups: data
        .map(item => ({
          sub_id: item.sub_id,
          group_id: item.group_id,
          contribution: item.contribution,
          admin_id: item.admin_id,
          group_name: item.group_name,
          members: 3,
          admin: item.admin_id === item.user_id,
        })),
      });
    })
  }

  createGroup(){
    const {groups} = this.state;
    groups.push({
      group_id: this.state.newGroupName.trim().toLowerCase(),
      group_name: this.state.newGroupName,
      members:0,
      admin: true
    });
    this.setState({isOpen:false, groups});
  }

  render() {
    if(!this.state.user){
      return null;
    } 
    const {handleLogout} = this.props;
    const {user, groups} = this.state; 
    
    return (
        <div className="App-home">
          <Dialog
            open={this.state.isOpen}
            onClose={() => this.setState({isOpen:false})}
           >
            <DialogTitle>CREATE GROUP</DialogTitle>
            <Divider />
            <DialogContent>
              <TextField
                id="name"
                label="Enter a group name"
                onChange={evt => this.setState({ newGroupName: evt.target.value })}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({isOpen:false})} color="primary">
                CLOSE
              </Button>
              <Button onClick={() => this.createGroup()} color="primary" autoFocus>
                CREATE GROUP
              </Button>
            </DialogActions>
          </Dialog>
           <header className="home-header">
             <Avatar src={user.user_pic} />
             <div style={{marginTop: 7}}>Welcome, {user.fname}</div>
              <Button 
                variant="fab" 
                color="primary" 
                aria-label="add" 
                className="create-group"
                onClick={() => this.setState({isOpen:true})}
              >
                <AddIcon />
              </Button>
           </header>
           <div className="group-list">
            <List>
            {
              groups.map(
                (group,id) => (
                  <div 
                   key={id} 
                   onClick={
                     () => this.props.history.push({
                      pathname: '/group/'+ group.group_id,
                      state:{
                        metadata:{user,group},
                      }
                     })
                    }>
                   <ListItem button>
                      <Avatar>
                        <Group />
                      </Avatar>
                      <ListItemText primary={group.group_name} secondary={`${group.members} members`} /> 
                      {
                        (group.admin)?
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
            </List>
          </div>
        </div>
      )
    //}
  }
}
