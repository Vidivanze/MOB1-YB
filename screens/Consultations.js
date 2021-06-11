import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ListItem } from 'react-native-elements';

import { UserContext } from '../context/UserContext';
import ConsultationsProvider from '../providers/ConsultationsProvider';
import { TouchableOpacity } from 'react-native';

class Consultations extends Component {

    constructor(props){
        super(props);
        this.state = {
            shifts: [],
            drugs: [],
            reports: []
        }
        
        this.consultationsProvider = new ConsultationsProvider();

    }
    
    componentDidMount(){        
        this.consultationsProvider.getReports(this.context.token).then((result)=>
            this.setState({ shifts: result.shift, drugs: result.drug, reports: result.shift})
        )
    }


    render() { 

        return (
            <ScrollView>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                    <TouchableOpacity style={style.buttonCheck} color="#841584" onPress={ () => this.setState({reports: this.state.shifts})}>
                        <Text>Garde</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonCheck} color="#841584" onPress={ () => this.setState({reports: this.state.drugs})}>
                        <Text>Stup</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:2}}>
                    {(this.state.reports) ? (
                        this.state.reports.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                            {(item.date) ? (
                                <ListItem.Title>Le {item.date}</ListItem.Title>
                            ) : 
                                <ListItem.Title>Semaine {item.week}</ListItem.Title>
                            }
                            <ListItem.Subtitle>à {item.base}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                        )))
                        : null
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

Consultations.contextType = UserContext;

export default Consultations;