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
            report: props.route.params.report,
            actionsInShift: [],
        }
        
        this.consultationsProvider = new ConsultationsProvider();
        
    }
    
    componentDidMount() {        
        this.consultationsProvider.getReportActionsInShift(this.context.token, this.state.report.id).then((result) =>
            this.setState({actionsInShift: result})
        )
        console.log(this.state.actionsInShift)
    }



    render() { 

        return (
            <ScrollView>
                <View style={{paddingTop: "10px"}}>
                    <Text>Dans le rapport du {this.state.report.date} à {this.context.selectedBase.name}</Text>
                </View>

                <View style={{paddingTop: "15px"}}>
                    {(this.state.actionsInShift) ? (
                        console.log(this.state.actionsInShift),
                        this.state.actionsInShift.map((item, i) => ( 
                            <ListItem key={i} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{item.action}</ListItem.Title>
                                {(item.day == 1) ? (
                                    <ListItem.Subtitle>jour / {item.at}</ListItem.Subtitle>
                                ) : 
                                    <ListItem.Subtitle>nuit / {item.at}</ListItem.Subtitle>
                                }
                                </ListItem.Content>
                            </ListItem>
                        ))
                    ) : null
                    }
                </View>
            </ScrollView>
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