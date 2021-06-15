import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

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
  headerRight: () => (<Ionicons name="log-out-outline" size="30px" onPress={() => alert('déconnexion')}></Ionicons>),
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle1}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const HomeStackNavigator = () => {
  return (<Home></Home>);
}

const ConsultationsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle2}>
      <Stack.Screen name="List" component={Consultations} />
      <Stack.Screen name="Details" component={ConsultationDetails} />
    </Stack.Navigator>
  );
}

const ReportsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle2}>
      <Stack.Screen name="List" component={Reports} />
    </Stack.Navigator>
  );
}



export { LoginStackNavigator, HomeStackNavigator, ConsultationsStackNavigator, ReportsStackNavigator };