import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  componentDidMount = async () =>{
    try {
      AsyncStorage.getItem('initials').then(
        (initials)=>{
          this.setState({initials: initials})
        }
      ),     
      AsyncStorage.getItem('token').then(
        (token)=>{
          this.setState({token: token})
        }
      ),     
      AsyncStorage.getItem('selectedBase').then(
        (selectedBase)=>{
          this.setState({selectedBase: JSON.parse(selectedBase)})
        }
      )
    } catch(e) {
      // read error
    }
  
  }


  logMeIn = async (initials, token, base) => {
      this.setState({
        initials: initials,
        token: token,
        selectedBase: base
      })
  
      this.saveStorage(initials, token, base)
  }

  logMeOut = async () => {
    this.setState({token: null, selectedBase: []})
    this.clearStorage()
    return <LoginStackNavigator></LoginStackNavigator>;
  }

  saveStorage = async (initials, token, base) => {
    try {
      await AsyncStorage.setItem('initials', initials)
      await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('selectedBase', JSON.stringify(base))
    } catch(e) {
      // save error
    }
  }

  clearStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
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