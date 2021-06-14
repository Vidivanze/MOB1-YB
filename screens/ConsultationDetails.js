import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image} from 'react-native';
import { ListItem,  } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { UserContext } from '../context/UserContext';
import ConsultationsProvider from '../providers/ConsultationsProvider';


class ConsultationDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
           consultationId: props.route.params.consultationId
        }
        
        this.consultationsProvider = new ConsultationsProvider();
        
    }
    
    componentDidMount() {        

    }



    render() { 

        return (
            <View>
                <Text>This is the details of {this.state.consultationId}</Text>
                <Button
                    title="Go to list Screen"
                    onPress={() => this.props.navigation.navigate("List")} // We added an onPress event which would navigate to the About screen
                />
                </View>
        );


    }   
}

const style = StyleSheet.create({
    buttonCheck: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "rgb(32, 137, 220)",
        borderColor: "rgb(32, 137, 220)",
        alignItems: "center",
        width: 150,
        height: 30,
      },
});

ConsultationDetails.contextType = UserContext;

export default ConsultationDetails;