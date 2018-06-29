import React, { Component } from 'react';
import { getMockData } from '../mockdata/dummyUserData';
import { StyleSheet, Text, View, Image, FlatList, Button, TouchableHighlight } from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class HomeScreen extends Component {

  gotoGroup(userData, groupID, type, username){
    const { navigation } = this.props;
    navigation.navigate('Group',{
        userData,
        groupID,
        type,
        username
      });
  }

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'DEFAULT_USERNAME');
    const firstname = navigation.getParam('firstname', 'DEFAULT_FIRSTNAME');
    const lastname = navigation.getParam('lastname', 'DEFAULT_LASTNAME');
    const type = navigation.getParam('type', 'fb');
    const drive = navigation.getParam('drive', 'dropbox');
    const getLogo = () => (type === 'google') ? 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';
    const logo = getLogo();
    const dummyUserData = getMockData();
    const userData = dummyUserData[username];
    const groupsData = Object.keys(userData['groups']).map(groupID => ({
      id: groupID,
      title: userData['groups'][groupID].name,
      members: userData['groups'][groupID].membercount,
      contribution: userData['groups'][groupID].contribution,      
    }));
    return (
      <View style={styles.container}>
        <Image source={{uri : logo}} style={{ padding: 30, marginBottom: 10 }}/>
        <View style={{ width: 100 }}>
          <Button
            onPress={() => navigation.push('Login')}
            title="Back"
            color={(type === 'google') ? '#db0f0f' : '#09248e'}
            accessibilityLabel="Learn more"
          />
        </View>
        <Text style={styles.greeting}>{`Welcome ${firstname} ${lastname}`}</Text>
        <Text style={styles.message}>Your subscribed groups are listed below</Text>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, width: 350}}>
          <FlatList
            data={groupsData}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.gotoGroup(userData, item.id, type, username)}>
              <ListItem
                key={item.id}                
                style={styles.content}
                roundAvatar
                title={`${item.title}`}
                subtitle={`Total ${item.members} members`}
                avatar={{ uri: logo }}
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
      fontSize: 30,
      fontFamily: 'sans-serif',
      fontStyle: 'italic',
      marginBottom: 25
    },
    content:{
      width: 150,
      marginBottom: 5,
    },
    message:{
      fontSize: 15,
      // fontFamily: 'sans-serif',
      fontStyle: 'italic',
      marginBottom: 25
    },
    button:{
      marginBottom: 25
    }
});
