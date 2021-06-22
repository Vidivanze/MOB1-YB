import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {Card} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Moment from 'moment';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/UserContext';

import ReportsProvider from '../../providers/ReportsProvider';

class TimesheetCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: [],
        }

        this.reportsProvider = new ReportsProvider();
    }
    
    componentDidMount(){
        this.setState({ item: this.props.item })
    }

  



    render() { 
        Moment.locale('fr');
        return (
            <Card>
                <Card.Title> {Moment(this.state.item.date).format('dddd DD MMMM')}</Card.Title>
                <Card.Divider/>
                    <View style={{alignItems: "center"}}>
                        <Text>pour le {Moment(this.state.item.date).format('dddd DD MMMM')}</Text>
                    </View>
                    
                    <View style={style.amountHeader}>
                        <Text style={{paddingRight: "85px"}}>Jour</Text>
                        <Text style={{paddingLeft: "40px"}}>Nuit</Text>
                    </View>
                
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
                        <TouchableOpacity style={style.sendButton}>
                            <Text style={style.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>

            </Card>
        );
    }
}

const style = StyleSheet.create({
    buttonCheck: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        color: "#fff",
        backgroundColor: "rgb(32, 137, 220)",
        borderColor: "rgb(32, 137, 220)",
        alignItems: "center",
        width: 150,
        height: 30,
    },
    
    buttonText: {
        color: "#fff",
    },

    amountInputDisplay: {
        paddingTop: "10px",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1, 
        flexDirection: "row",
    },

    amountHeader: {
        paddingTop: "10px",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1, 
        flexDirection: "row",
    },

    sendButton: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        color: "#fff",
        backgroundColor: "#82cc62",
        borderColor: "#66a04d",
        alignItems: "center",
        width: 150,
        height: 30,
    }
});

TimesheetCard.contextType = UserContext;

export default TimesheetCard;