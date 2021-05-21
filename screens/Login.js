import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';

class Login extends Component {
    state = {
        base: '', 
    }
    
    render() {
    return (
        <View>
            <TextInput placeholder="Initiales"/>
            <TextInput secureTextEntry={true} placeholder="Mot de passe"/>

            <Picker
                selectedValue={this.currency}>
                <Picker.Item label="USD" value="US Dollars" />
                <Picker.Item label="EUR" value="Euro" />
                <Picker.Item label="NGN" value="Naira" />
                </Picker>
            <Text>
            Selected: {this.currency}
            </Text>

            <Button title="Learn More" color="#841584" accessibilityLabel="Connexion"/>

        </View>
    );
  }
}

export default Login;