import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image} from 'react-native';
import { ListItem,  } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Moment from 'moment';


import { UserContext } from '../context/UserContext';
import ConsultationsProvider from '../providers/ConsultationsProvider';


const Stack = createStackNavigator();

function consultationsList() {
    
}


class Consultations extends Component {

    constructor(props){
        super(props);
        this.state = {
            shifts: [],
            drugs: [],
            displayList: []
        }
        
        this.consultationsProvider = new ConsultationsProvider();

    }
    
    componentDidMount() {        
        this.consultationsProvider.getReports(this.context.token).then((result)=>
            this.setState({ shifts: result.shift, drugs: result.drug, displayList: result.shift})
        )
    }



    render() { 
        Moment.locale('fr');
        return (
            <ScrollView>
                <View style={{flex: 8, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: 'center', paddingTop: "15px"}}>
                    <TouchableOpacity style={style.buttonCheck} onPress={ () => this.setState({displayList: this.state.shifts})}>
                        <Text style={style.buttonText}>GARDE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonCheck} onPress={ () => this.setState({displayList: this.state.drugs})}>
                        <Text style={style.buttonText}>STUP</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:2, paddingTop: "15px"}}>
                    {(this.state.displayList) ? (
                        this.state.displayList.map((item, i) => (
                        <ListItem key={i} bottomDivider onPress={() => this.props.navigation.navigate("Details", {report: item})}>
                            <ListItem.Content>
                            {(item.date) ? (
                                <ListItem.Title>Le {Moment(item.date).format('D MMMM YYYY')}</ListItem.Title>
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
        paddingTop: 5,
        backgroundColor: "rgb(32, 137, 220)",
        borderColor: "rgb(32, 137, 220)",
        alignItems: "center",
        width: 150,
        height: 30,
    },
    
    buttonText: {
        color: "#fff",
    }
});

Consultations.contextType = UserContext;

export default Consultations;