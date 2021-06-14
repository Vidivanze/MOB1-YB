import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Consultations from '../Consultations';
import ConsultationDetails from '../ConsultationDetails';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};



const ConsultationsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="List" component={Consultations} />
      <Stack.Screen name="Details" component={ConsultationDetails} />
    </Stack.Navigator>
  );
}


export { ConsultationsStackNavigator };