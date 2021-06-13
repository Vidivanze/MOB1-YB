import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserContext } from './context/UserContext';
import Login from './screens/Login';
import Home from './screens/Home';


function login() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Login></Login>
    </View>
  );
}

const Stack = createStackNavigator();

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        token: null,
        selectedBase: []
    }  
    
  }

  logMeIn = (token, base) => {
    this.setState({
      token: token,
      selectedBase: base
    })
  }


  renderElement(){
    if(this.state.token == null)
      return <Stack.Screen name="Connexion" component={Login}/>;
    else 
    return <Stack.Screen name="CSU APP" component={Home}/>;
  }

  render(){
    return (
      <SafeAreaProvider>
        <UserContext.Provider
          value={
            {
              token: this.state.token,
              selectedBase: this.state.selectedBase,
              logMeIn: this.logMeIn
            }
          }  
        >
        <Toast ref={(ref) => Toast.setRef(ref)} />
          <NavigationContainer>
            <Stack.Navigator>
              {this.renderElement()}
            </Stack.Navigator>
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