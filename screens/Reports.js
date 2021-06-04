import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';

import { UserContext } from '../context/UserContext';

class Reports extends Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    

    render() { 
        return (
            <Text>Reports</Text>
        );


    }
}

Reports.contextType = UserContext;

export default Reports;