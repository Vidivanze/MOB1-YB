import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';

import { UserContext } from '../context/UserContext';
import TimesheetsList from './components/TimesheetsList';

class Timesheets extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }
    

    render() { 
        return (
            <ScrollView>
                <View>
                    <TimesheetsList sort={this.state.sort}></TimesheetsList>    
                </View>  
            </ScrollView>
        );
    }
}

Timesheets.contextType = UserContext;

export default Timesheets;