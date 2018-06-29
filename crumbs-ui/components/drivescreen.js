import React, { Component } from 'react'
import { getMockData } from '../mockdata/dummyUserData';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';

export default class DriveScreen extends Component {
  gotoHome(username,firstname,lastname,type,drive){
    const { navigation } = this.props;
    const dummyUserData = getMockData();
    //alert(dummyUserData[username]['firstname']);
    navigation.navigate('Home',{
      username,
      firstname,
      lastname,
      type,
      drive
    })
  }
  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'DEFAULT_USERNAME');
    const firstname = navigation.getParam('firstname', 'DEFAULT_FIRSTNAME');
    const lastname = navigation.getParam('lastname', 'DEFAULT_LASTNAME');
    const type = navigation.getParam('type', 'fb');
    return (
      <View style={styles.container}>
        <Text style={styles.textContent}>Choose a drive</Text>
        <View style={styles.imgContainer}>
          <TouchableHighlight onPress={()=>this.gotoHome(username,firstname,lastname,type,'dropbox')}>
            <View style={styles.imgFrame}>
            <Image source={require('../img/dropbox_logo.png')} style={{ padding: 30, marginBottom: 20, height: 150, width: 150 }}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.gotoHome(username,firstname,lastname,type,'google_drive')}>
            <View style={styles.imgFrame}>
              <Image source={require('../img/google_drive_logo.png')} style={{ padding: 30, marginBottom: 20, height: 150, width: 150 }}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cedded',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textContent:{
      fontSize: 40,
      fontStyle: 'italic',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      paddingBottom: 30,
    },
    imgContainer:{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'flex-start'      
    },
    imgFrame:{
      height: 200,
      width: 200,
      padding: 21,
    },
    button:{
      width: 200,
      marginBottom: 30,
    }
});
