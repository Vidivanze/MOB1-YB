import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';

import { UserContext } from '../context/UserContext';

class Consultations extends Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    

    render() { 
        return (
            <Text>Consultations</Text>
        );


    }
}

Consultations.contextType = UserContext;

export default Consultations;