import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';

import { UserContext } from '../context/UserContext';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Drugs from './Drugs';
import Consultations from './Consultations';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: '25px' }}>
        <Consultations></Consultations>
      </View>
    );
  }
  
function DrugsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: '25px' }}>
      <Drugs></Drugs>
    </View>
  );
}


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    

    render() { 
        return (
            <Tab.Navigator>
              <Tab.Screen name="Consultations" component={HomeScreen} />
              <Tab.Screen name="Drogues" component={DrugsScreen} />
            </Tab.Navigator>
        );


    }
}

Home.contextType = UserContext;

export default Home;