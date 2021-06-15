import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Login";
import Home from "../Home";
import Consultations from '../Consultations';
import ConsultationDetails from '../ConsultationDetails';
import Reports from '../Reports';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const HomeStackNavigator = () => {
  return (<Home></Home>);
}

const ConsultationsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="List" component={Consultations} />
      <Stack.Screen name="Details" component={ConsultationDetails} />
    </Stack.Navigator>
  );
}

const ReportsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="List" component={Reports} />
    </Stack.Navigator>
  );
}


export { LoginStackNavigator, HomeStackNavigator, ConsultationsStackNavigator, ReportsStackNavigator };