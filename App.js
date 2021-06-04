import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import { Header, ThemeProvider, Tab} from 'react-native-elements';
import { UserContext } from './context/UserContext';
import { Component } from 'react';
import LoginProvider from './providers/LoginProvider';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        token: null
    }  
  }

  isLoggedIn = (value) => {
    this.setState({
      token: value,
    })
  }


  render (){
    return (
      <SafeAreaProvider>
        <UserContext.Provider
          value={
            {
              token: this.state.token,
              isLoggedIn: this.isLoggedIn
            }
          }  
        >

          <View style={styles.container}>
            <Header
              //leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'CSU', style: { color: '#fff' } }}
              //rightComponent={{ icon: 'home', color: '#fff' }}
            />
            
            <Tab>
              <Tab.Item title="Recent" />
              <Tab.Item title="favourite" />
              <Tab.Item title="cart" />
            </Tab>
          </View>

          <View style={styles.content}>
            <Text>Bienvenue !</Text>
            <Login></Login>        
          </View>
        </UserContext.Provider>
      </SafeAreaProvider>

    );
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