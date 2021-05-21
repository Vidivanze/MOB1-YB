import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';

import axios from 'axios';
import API from '../api/Api';   

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            bases: new Array()
        }
    }
    
    componentDidMount(){
        API.get('bases')
        .then(res => {
            this.setState({bases: res.data});
            console.log(this.state.bases);
        })
    }
   

    render() {
    return (
        <View>
            <View style={{flex:2}}>
                <Input placeholder="Initiales"/>
                <Input secureTextEntry={true} placeholder="Mot de passe"/>
            </View>
            <View style={{flex:2}}>
                <Picker style={{marginTop: 10}}>
                    {this.state.bases.map(base =>
                        <Picker.Item label={base.name} value={base.id} />    
                    )}
                </Picker>
            </View>

            <Button style={{marginTop: 10}} title="Connexion" color="#841584"/>
            

        </View>
    );


  }
}



export default Login;