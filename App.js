import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {LoginStackNavigator, HomeStackNavigator} from './screens/navigation/StackNavigator';
import { UserContext } from './context/UserContext';


const Stack = createStackNavigator();

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        initials: null,
        token: null,
        selectedBase: []
    }  
    
  }

  logMeIn = (initials, token, base) => {
    this.setState({
      initials: initials,
      token: token,
      selectedBase: base
    })
  }

  logMeOut = () => {
    this.setState({token: null, selectedBase: []})
    return <LoginStackNavigator></LoginStackNavigator>;
  }


  renderElement(){
    if(this.state.token == null)
      return <LoginStackNavigator></LoginStackNavigator>;
    else 
    return <HomeStackNavigator></HomeStackNavigator>;
  }

  render(){
    return (
      <SafeAreaProvider>
        <UserContext.Provider
          value={
            {
              initials: this.state.initials,
              token: this.state.token,
              selectedBase: this.state.selectedBase,
              logMeIn: this.logMeIn,
              logMeOut: this.logMeOut
            }
          }  
        >
        <Toast ref={(ref) => Toast.setRef(ref)} />
          <NavigationContainer>
              {this.renderElement()}
          </NavigationContainer>
        </UserContext.Provider>
      </SafeAreaProvider>

    )
  }
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#fff',
  },

  content: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#fff',
    justifyContent: 'center', 
  },
});


export default App;