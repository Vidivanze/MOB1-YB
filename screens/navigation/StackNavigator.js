import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../../context/UserContext';

import Login from "../Login";
import Home from "../Home";
import Consultations from '../Consultations';
import ConsultationDetails from '../ConsultationDetails';
import Reports from '../Reports';


const Stack = createStackNavigator();

const screenOptionStyle1 = {
  headerStyle: {
    backgroundColor: "#rgb(32, 137, 220)",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const screenOptionStyle2 = {
  headerStyle: {
    backgroundColor: "#rgb(32, 137, 220)",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


export class LoginStackNavigator extends Component{
  render(){
    return (
      <Stack.Navigator screenOptions={screenOptionStyle1}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }
}

export class HomeStackNavigator extends Component{
  render(){ 
    return (<Home></Home>);
  }
}

export class ConsultationsStackNavigator extends Component{
  render(){
    return (
      <Stack.Navigator screenOptions={{     
        headerStyle: {
          backgroundColor: "#rgb(32, 137, 220)",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
        headerRight: () => (
          <Text style={style.userInfos}>{this.context.initials}@{this.context.selectedBase.name}  
            <Ionicons name="log-out-outline" size="30px" onPress={() => this.context.logMeOut()} style={style.logOutIcon}></Ionicons>
          </Text>
        ),
      }}>
        <Stack.Screen name="List" component={Consultations} />
        <Stack.Screen name="Details" component={ConsultationDetails} />
      </Stack.Navigator>
    );
  }
}

export class ReportsStackNavigator extends Component{
  render(){
    return (
      <Stack.Navigator screenOptions={{     
        headerStyle: {
          backgroundColor: "#rgb(32, 137, 220)",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
        headerRight: () => (
          <Text style={style.userInfos}>{this.context.initials}@{this.context.selectedBase.name}  
            <Ionicons name="log-out-outline" size="30px" onPress={() => this.context.logMeOut()} style={style.logOutIcon}></Ionicons>
          </Text>
        ),
      }}>
        <Stack.Screen name="List" component={Reports} />
      </Stack.Navigator>
    );
  } 
}

const style = StyleSheet.create({
  logOutIcon: {
    paddingLeft: '15px', 
    paddingRight: '15px',
    paddingTop: '20px'
  },

  userInfos: {
      color: "#fff",
      alignContent: 'center'
  }
});
  
ConsultationsStackNavigator.contextType = UserContext;
ReportsStackNavigator.contextType = UserContext;
