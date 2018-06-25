import React, { Component } from 'react'
import {getMockGroupData} from '../mockdata/dummyGroupData'
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight} from 'react-native';
import {List, ListItem, Badge} from 'react-native-elements';

const iconMapper = {
    picture: 'image',
    video: 'movie-filter',
    document: 'insert-drive-file',
    music: 'music-note',
};

export default class GroupScreen extends Component {
  render() {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData', {
        'groups':{
            'def_group':{}
        }
    });
    const groupID = navigation.getParam('groupID', 'def_group');
    const username = navigation.getParam('username', 'def_user');
    const currentGroupData = userData.groups[groupID];
    const currentGroupDetails = getMockGroupData()[groupID];
    const fileList = currentGroupDetails.files;
    const memberList = currentGroupDetails.members;
    const isUserAdmin = memberList.filter(member => member.username === username)[0].admin;
    const type = navigation.getParam('type', 'fb');
    const getLogo = () => (type === 'google') ? 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';
    const logo = getLogo();
    return (
      <View style={styles.container}>
        <Image source={{uri : logo}} style={{ padding: 30, marginBottom: 10 }}/>
        {
        (isUserAdmin) ? 
          <Badge containerStyle={{ backgroundColor: '#75ff95' }}>
            <Text>ADMIN</Text>
          </Badge> :
          null
        }
        <Text style={styles.greeting}>{currentGroupData.name}</Text>
        <Text style={styles.message}>{`You have contributed ${currentGroupData.contribution} GB to this group`}</Text>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, width: 350}}>
          <FlatList
            data={fileList}
            renderItem={({ item: file }) => (
             <TouchableHighlight onLongPress={()=>alert(`Downloaded ${file.name}`)}>
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
      </View>
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
    button:{
      width: 200,
      marginBottom: 30,
    }
});

