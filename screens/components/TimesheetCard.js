import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Input } from 'react-native-elements';
import Moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/UserContext';

import TimesheetsProvider from '../../providers/TimesheetsProvider';

class TimesheetCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: [],
            itemType: "",
            confirmation: "",
            reason: "",
        }

        this.timesheetsProvider = new TimesheetsProvider();
    }
    
    componentDidMount(){
        this.setState({ item: this.props.item, itemType: this.props.item.worktime.type, confirmation: this.props.item.confirmation})
    }

    saveTimesheet(){
        const timesheet = new FormData();
        console.log(this.state.item.id)
        console.log(+this.state.confirmation)
        timesheet.append("id", this.state.item.id);
        timesheet.append("confirmation", this.state.confirmation);
        timesheet.append("reason", this.state.reason);

        this.timesheetsProvider.confirmWorkPlan(timesheet, this.context.token).then((res) =>{
            Toast.show({
                position: 'top',
                type: 'success',
                text1: 'Horaire envoyé',
            });
            this.props.getTimesheets();
        }, cause => {
                Toast.show({
                    position: 'top',
                    type: 'error',
                    text1: 'Erreur d\'enregistrement',
                })
            }
        ).catch (error => {
            Toast.show({
                position: 'top',
                type: 'error',
                text1: 'Erreur d\'enregistrement',
            })
            console.log(error)
        })
    }



    render() { 
        Moment.locale('fr');
        return (
            <Card>
                <Card.Title>{this.state.itemType +" - "+ Moment(this.state.item.date).format('dddd DD MMMM')}</Card.Title>
                <Card.Divider/>
                    
                    <View style={{alignItems: 'center', paddingBottom: 10}}>
                        <Picker name="base" style={{ height: 20, width: 100, marginTop: 10}} selectedValue={this.state.confirmation} onChange={val => this.setState({ confirmation: val.target.value })}>
                            <Picker.Item key="null" label="Inconnu" value="null" />
                            <Picker.Item key="0" label="À discuter" value="0"/>
                            <Picker.Item key="1" label="Confirmer" value="1" />
                        </Picker>
                    </View>

                   
                    {(this.state.item.confirmation == '0') ?
                        <View style={{alignItems: "center"}}> 

                           <Text>Raison : {this.state.item.reason}</Text>
                        </View>
                    : null }

                    {(this.state.confirmation == '0') ?
                        <View style={{alignItems: "center"}}>                        
                            <Input placeholder="Raison" name="reason" onChange={val => this.setState({ reason: val.target.value })}/>
                        </View>
                    : null }

                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
                        <TouchableOpacity style={style.sendButton} onPress={() => this.saveTimesheet()}>
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