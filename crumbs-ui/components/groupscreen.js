import React, { Component } from 'react'
import {getMockGroupData} from '../mockdata/dummyGroupData'
import { StyleSheet, View, FlatList, Text, Image, TouchableHighlight, Modal, ScrollView} from 'react-native';
import {List, ListItem, Badge, Avatar, Button, SearchBar, Card, SocialIcon, CheckBox} from 'react-native-elements';

const iconMapper = {
    picture: 'image',
    video: 'movie-filter',
    document: 'insert-drive-file',
    music: 'music-note',
};

export default class GroupScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
       openOverlay: false,
       searchTerm:'',
       users:[],
       selectedUsers:[]
    };
  }

  componentDidMount(){
    fetch('https://randomuser.me/api/?results=10')
    .then(resp => resp.json())
    .then(data => this.setState({users: data.results}))
  }

  render() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    const userData = navigation.getParam('userData', {
        'groups':{
            'def_group':{}
        }
    });
    const {users} = this.state;
    const groupID = navigation.getParam('groupID', 'def_group');
    const username = navigation.getParam('username', 'def_user');
    const currentGroupData = userData.groups[groupID];
    const currentGroupDetails = getMockGroupData()[groupID];
    const fileList = currentGroupDetails.files;
    const memberList = currentGroupDetails.members;
    const isUserAdmin = memberList.filter(member => member.username === username)[0].admin;
    const type = navigation.getParam('type', 'fb');
    const getLogo = () => 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';
    const logo = getLogo();
    return (
      <ScrollView 
        contentContainerStyle={styles.container}
      >
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.openOverlay}
          onRequestClose={
            () => this.setState({openOverlay:false})
          }>
          <ScrollView style={{marginTop: 22}}>
            <SearchBar
              lightTheme
              containerStyle={{ top: -1, position: 'relative'}}
              onChangeText={searchTerm => this.setState({searchTerm})}
              onClearText={() => alert('Noway!')}
              icon={{ type: 'font-awesome', name: 'search' }}
              placeholder='Invite a user...' 
            />
            <Card title="Available for invite">
            {
              users
              .filter(u => (
                (this.state.searchTerm === '') || 
                (u.name.first.toLowerCase().includes(this.state.searchTerm.toLowerCase())) ||
                (u.name.last.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
              ))
              .map((u, i) => (
                  <View key={i} style={styles.user}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: u.picture.medium }}
                    />
                    <CheckBox
                      title={u.name.first.toUpperCase() + ' ' + u.name.last.toUpperCase()}
                      checked={this.state.selectedUsers.includes(u)}
                      onPress={
                        evt => {
                          //alert(evt.target.checked);
                          let {selectedUsers} = this.state;
                          if(!selectedUsers.includes(u)){
                            selectedUsers.push(u);
                          } else {
                            let index = selectedUsers.indexOf(u);
                            selectedUsers.splice(index,1);
                          }
                          this.setState({selectedUsers});
                        }
                      }
                    />
                  </View>
              ))
            }
            </Card>
            <SocialIcon
              title='Invite user(s)'
              button
              type='facebook'
              onPress={
                () => {
                alert('Request sent to '+this.state.selectedUsers[0].name.first.toUpperCase()+' and '+(this.state.selectedUsers.length - 1)+' others');
                this.setState({openOverlay: false})
              } 
            }
            />
          </ScrollView>
        </Modal>
        <Image source={{uri : logo}} style={{ padding: 30, marginBottom: 10 }}/>
        {
        (isUserAdmin) ? 
        <View>
          <Badge containerStyle={{ backgroundColor: '#75ff95', width: 80, marginBottom: 20, alignSelf:'center' }}>
            <Text style={{color: 'green'}}>ADMIN</Text>
          </Badge>
        </View>:
          null
        }
        <View style={styles.members}>
         {
           memberList.map(member => (
            <Avatar
              size="small"
              rounded
              source={{uri: member.uri}}
              onPress={() => alert(member.firstname+' '+member.lastname)}
              activeOpacity={0.7}
            />
           ))
         }
         {
           (isUserAdmin) ?
            <Button
              raised
              buttonStyle={{
                backgroundColor: '#09248e',
                width: 59,
                height: 40,
                borderColor: "#09248e",
                borderWidth: 0
              }}
              icon={{
                name: 'person-add',
                size: 25,
                color: 'white'
              }}
              onPress={() => this.setState({openOverlay: true})}
            />:
            null
         }
        </View>
        <Text style={styles.greeting}>{currentGroupData.name}</Text>
        <Text style={styles.message}>{`You have contributed ${currentGroupData.contribution} GB to this group`}</Text>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, width: 350}}>
          <FlatList
            data={fileList}
            renderItem={({ item: file }) => (
             <TouchableHighlight  key={file.id} onLongPress={()=>alert(`Downloaded ${file.name}`)}>
              <ListItem
                topDivider
                bottomDivider                
                key={file.id}
                style={styles.content}
                title={`${file.name}`}
                subtitle={`${file.size} GB`}
                leftIcon={{ name: iconMapper[file.type] }}
                rightIcon={{ name: 'file-download' }}
              />
             </TouchableHighlight>
            )}
          />
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#cedded',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    greeting:{
      fontSize: 40,
      fontFamily: 'sans-serif',
      fontStyle: 'italic',
    },
    message:{
      fontSize: 15,
      fontFamily: 'sans-serif',
    },
    content:{
        width: 150,
        marginBottom: 5,
    },
    user:{
      display:'flex',
      flexDirection: 'row',
      borderBottomColor:'grey',
      overflow:'scroll'
    },
    image:{
      width: 40,
      height: 40,
    },
    members:{
      display:'flex',
      width: 200,
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    button:{
      width: 200,
      marginBottom: 30,
    }
});

