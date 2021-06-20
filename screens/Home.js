import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../context/UserContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator, { ConsultationsStackNavigator, ReportsStackNavigator } from './navigation/StackNavigator';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    

    render() { 
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Consulter') {
                iconName = focused
                  ? 'ios-list'
                  : 'ios-list';
              } else if (route.name === 'Rapporter') {
                iconName = focused ? 'ios-medkit' : 'ios-medkit';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'rgb(32, 137, 220)',
            inactiveTintColor: 'gray',
          }}  
        >
          <Tab.Screen name="Consulter" component={ConsultationsStackNavigator}/>
          <Tab.Screen name="Rapporter" component={ReportsStackNavigator} />
        </Tab.Navigator>
        
      );


    }
}

Home.contextType = UserContext;

export default Home;