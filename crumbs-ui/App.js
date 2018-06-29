import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './components/login';
import HomeScreen from './components/homescreen';
import DriveScreen from './components/drivescreen';
import GroupScreen from './components/groupscreen';


const RootStack = createStackNavigator({
  Login: Login,
  Home: HomeScreen,
  Group: GroupScreen,
  Drive: DriveScreen,
},
{
  initialRouteName: 'Login',
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
