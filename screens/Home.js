import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../context/UserContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator, { ConsultationsStackNavigator, ReportsStackNavigator, TimesheetsStackNavigator } from './navigation/StackNavigator';

import TimesheetsProvider from '../providers/TimesheetsProvider';
import Timesheets from './Timesheets';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          timesheetsAmout: null
        }

        this.timesheetsProvider = new TimesheetsProvider();
    }
    
    componentDidMount(){
      this.timesheetsProvider.countUncheckedTimesheets(this.context.token).then(res => {
        this.setState({timesheetsAmout: res})
      }, cause => {
          Toast.show({
              position: 'top',
              type: 'error',
              text1: 'Erreur Réseau',
              text2: 'Verifiez que votre appareil est bien connecté'
          })
        }).catch (error => {
          Toast.show({
              position: 'top',
              type: 'error',
              text1: 'Erreur Réseau',
              text2: 'Verifiez que votre appareil est bien connecté'
          })
      })
    }

    render() { 
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Consulter') {
                iconName = focused ? 'ios-list' : 'ios-list';
              } else if (route.name === 'Rapporter') {
                iconName = focused ? 'ios-medkit' : 'ios-medkit';
              }else if (route.name === 'Timesheets'){
                iconName = focused ? 'alarm-outline' : 'alarm-outline';
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
          <Tab.Screen name="Timesheets" component={TimesheetsStackNavigator} options={{ tabBarBadge: this.state.timesheetsAmout }}/>
        </Tab.Navigator>
        
      );


    }
}

Home.contextType = UserContext;

export default Home;