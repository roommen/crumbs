import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import { getMockData } from '../mockdata/dummyUserData';

export default class Login extends React.Component {
  gotoDrive(username, type){
    const { navigation } = this.props;
    const dummyUserData = getMockData();
    //alert(dummyUserData[username]['firstname']);
    navigation.navigate('Drive',{
      username,
      firstname: dummyUserData[username]['firstname'],
      lastname: dummyUserData[username]['lastname'],
      type,
    })
  }

  render() {
    // const dummyUserData = getMockData();
    return (
    <View style={styles.container}>
      <Text style={styles.welcome}>WELCOME TO</Text>
      <Image source={require('../img/CRUMBS_LOGO.png')} style={{ padding: 60, marginBottom: 20, width: 190, height: 40 }}/>
      <View style={styles.button}>
      <SocialIcon
        title='Sign In With Facebook'
        button
        type='facebook'
        onPress={() => this.gotoDrive('test_fb','facebook') }
      />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cedded',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome:{
      fontSize: 40,
      fontFamily: 'sans-serif',
    },
    button:{
      width: 300,
      marginBottom: 30,
    }
});
  