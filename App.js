import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import { Header, ThemeProvider, Tab} from 'react-native-elements';

export default function App() {
  return (
    <SafeAreaProvider>

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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#fffff',
  },

  content: {
    marginTop: 30,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
