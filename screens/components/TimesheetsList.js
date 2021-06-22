import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View} from 'react-native';
import Moment from 'moment';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/UserContext';

class TimesheetsList extends Component {

    constructor(props){
        super(props);
        this.state = {
        }

    }
    

    componentDidMount(){
    }

    

    render() { 
        Moment.locale('fr');
        return (
            <ScrollView>
                <Text>TimesheetsList</Text>  
            </ScrollView>
        );
    }
}



TimesheetsList.contextType = UserContext;

export default TimesheetsList;