import React, { Component } from 'react';
import { getMockData } from '../mockdata/dummyUserData';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight, Modal, ScrollView } from 'react-native';
import {Button, List, ListItem, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
       openOverlay: false,   
       inputGroupName: '',   
    };
  }

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
    console.disableYellowBox = true;
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'DEFAULT_USERNAME');
    const firstname = navigation.getParam('firstname', 'DEFAULT_FIRSTNAME');
    const lastname = navigation.getParam('lastname', 'DEFAULT_LASTNAME');
    const type = navigation.getParam('type', 'fb');
    const drive = navigation.getParam('drive', 'dropbox');
    //const driveImgUrl = (drive === 'dropbox') ? '../img/dropbox_logo.png':'../img/google_drive_logo.png';
    const getLogo = () => 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';
    const logo = getLogo();
    const dummyUserData = getMockData();
    const userData = dummyUserData[username];
    const groupsData = Object.keys(userData['groups']).map(groupID => ({
      id: groupID,
      title: userData['groups'][groupID].name,
      members: userData['groups'][groupID].membercount,
      contribution: userData['groups'][groupID].contribution,  
      admin: userData['groups'][groupID].admin || false,  
    }));
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
          }
        >
          <View style={{ flex: 1, justifyContent:'center', alignContent:'center'  }}>
            <Text style={{ fontSize: 30, fontWeight: '600', textAlign:'center', width:360}}>CREATE YOUR GROUP</Text>
            <FormLabel>Enter a group name</FormLabel>
            <FormInput onChangeText={inputGroupName => this.setState({inputGroupName})}/>
            <View style={{ width: 360, textAlign:'center' }}>
              <Button
                raised
                large
                buttonStyle={{
                  backgroundColor: '#09248e',
                  borderColor: "#09248e",
                  borderWidth: 0
                }}
                icon={{
                  name: 'create',
                  size: 25,
                  color: 'white'
                }}
                onPress={() => {
                  if(!this.state.inputGroupName){
                    alert('A group must have a name')
                  } else {
                    this.setState({openOverlay: false});
                    alert('Created group '+this.state.inputGroupName)
                  }                  
                }}
                title='CREATE GROUP' 
              />
            </View>
          </View>
        </Modal>
        <Image source={{uri : logo}} style={{ padding: 30, marginBottom: 10 }}/>
        { (drive === 'dropbox') ?
          <Image source={require('../img/dropbox_logo.png')} style={{ height:50, width:50, padding: 30, marginBottom: 10 }}/>:
          <Image source={require('../img/google_drive_logo.png')} style={{ height:50, width:50, padding: 30, marginBottom: 10 }}/>
        }
        <View style={{ width: 270 }}>
          <Button
            raised
            large
            buttonStyle={{
              backgroundColor: '#09248e',
              borderColor: "#09248e",
              borderWidth: 0
            }}
            icon={{
              name: 'create',
              size: 25,
              color: 'white'
            }}
            onPress={() => this.setState({openOverlay: true})}
            title='CREATE A GROUP' 
          />
        </View>
        <Text style={styles.greeting}>{`Welcome ${firstname} ${lastname}`}</Text>
        <Text style={styles.message}>Your groups are listed below</Text>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, width: 350}}>
          <FlatList
            data={groupsData}
            renderItem={({ item }) => (
              <TouchableHighlight key={item.id} onPress={() => this.gotoGroup(userData, item.id, type, username)}>
              <ListItem
                key={item.id}                
                style={styles.content}
                topDivider
                bottomDivider  
                title={`${item.title}`}
                subtitle={`Total ${item.members} members`}
                leftIcon={{ name: 'group' }}
                badge={(item.admin) ? { value: 'ADMIN', textStyle: { color: 'green' }, containerStyle: { backgroundColor: '#75ff95'} }: null}
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
