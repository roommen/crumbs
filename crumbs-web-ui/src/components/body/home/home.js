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

let groups = [
  {
    id:'avg_ind',
    name:'Avengers India',
    members:4,
    admin:false,
  },
  {
    id:'gl_dev',
    name:'Global Developers',
    members:3,
    admin:true,
  },
  {
    id:'react_un',
    name:'React Union',
    members:5,
    admin:false,
  },
  {
    id:'indo_pg',
    name:'Indo-polyglots',
    members:2,
    admin:true,
  },
  {
    id:'aggregators',
    name:'The Aggregators',
    members:2,
    admin:false,
  }
];

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state ={
      isOpen: false,
      newGroupName:'',
      user: null,
    };
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('userDetails'));
    alert(user.name);
    fetch('http://localhost:1990/users/'+ user.name.split(' ')[0])
    .then(resp => resp.json())
    .then(user => {
      console.log('Received Data', user);
      this.setState({user});
    })
  }

  createGroup(){
    groups.push({
      id: this.state.newGroupName.trim().toLowerCase(),
      name: this.state.newGroupName,
      members:0,
      admin: true
    });
    this.setState({isOpen:false});
  }

  render() {
    if(!this.state.user){
      return null;
    } 
    const {handleLogout} = this.props;
    const {user} = this.state;    
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
             <Avatar style={{color:'white', backgroundColor:'orange'}}>JD</Avatar>
             <div style={{marginTop: 7}}>Welcome, {user.name}</div>
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
                  <div key={id} onClick={() => this.props.history.push('/group/456')}>
                   <ListItem button>
                      <Avatar>
                        <Group />
                      </Avatar>
                      <ListItemText primary={group.name} secondary={`${group.members} members`} /> 
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
