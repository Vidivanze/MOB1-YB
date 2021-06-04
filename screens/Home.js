import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';

import axios from 'axios';
import LoginProvider from '../providers/LoginProvider';   
import { UserContext } from '../context/UserContext';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    
    componentDidMount(){
        this.loginProvider.getBases().then((result)=>
            this.setState({bases: result})
        )
    }


    render() { 
        return (
            <View>
               <Text>Home</Text>

            </View>
        );


    }
}

Home.contextType = UserContext;

export default Home;