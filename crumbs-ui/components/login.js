import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { getMockData } from '../mockdata/dummyUserData';

export default class Login extends React.Component {
  gotoHome(username, type){
    const { navigation } = this.props;
    const dummyUserData = getMockData();
    //alert(dummyUserData[username]['firstname']);
    navigation.navigate('Home',{
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
      <Image source={require('../img/CRUMBS_LOGO.png')} style={{ padding: 30, marginBottom: 20 }}/>
      <View style={styles.button}>
        <Button
          onPress={() => this.gotoHome('test_google','google') }
          title="Login with Google"
          color="#db0f0f"
          accessibilityLabel="Learn more"
        />
      </View>
      <View style={styles.button}>
        <Button
         onPress={() => this.gotoHome('test_fb','facebook') }
          title="Login with Facebook"
          color="#09248e"
          accessibilityLabel="Learn more"
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
      width: 200,
      marginBottom: 30,
    }
});
  