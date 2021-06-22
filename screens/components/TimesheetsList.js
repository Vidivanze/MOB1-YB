import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View} from 'react-native';
import Moment from 'moment';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/UserContext';
import TimesheetsProvider from '../../providers/TimesheetsProvider';
import TimesheetCard from './TimesheetCard';

class TimesheetsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            amount: this.props.amout,
            noDataMessage: "",
            uncheckedTimesheets: []
        }

        this.timesheetsProvider = new TimesheetsProvider();
        this.getTimesheets = this.getTimesheets.bind(this);
        
    }
    

    componentDidMount(){
        this.timesheetsProvider.countUncheckedTimesheets(this.context.token).then(res => {
            this.setState({timesheetsAmout: res});
          }, cause => {
              Toast.show({
                  position: 'top',
                  type: 'error',
                  text1: 'Erreur Réseau',
                  text2: 'Verifiez que votre appareil est bien connecté'
              })
            }).catch (error => {
              Toast.show({
                  position: 'top',
                  type: 'error',
                  text1: 'Erreur Réseau',
                  text2: 'Verifiez que votre appareil est bien connecté'
              })
          })

        this.getTimesheets();
    }

    getTimesheets(){
        this.setState({uncheckedTimesheets: []})
        this.timesheetsProvider.getUncheckedTimesheets(this.context.token).then((result) => {
            this.setState({ uncheckedTimesheets: result})
            }, cause => {
                this.setState({noDataMessage: "Vous avez confirmé tous vos horaires"})
                Toast.show({
                    position: 'top',
                    type: 'error',
                    text1: 'Erreur Réseau',
                    text2: 'Verifiez que votre appareil est bien connecté'
                })
            }
        ).catch (error => {
            this.setState({noDataMessage: "Vous avez confirmé tous vos horaires"})
            Toast.show({
                position: 'top',
                type: 'error',
                text1: 'Erreur Réseau',
                text2: 'Verifiez que votre appareil est bien connecté'
            })
        })
    }
    

    render() { 
        Moment.locale('fr');
        return (
            <ScrollView>
                <View style={{paddingTop: '10px', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', size: '28px'}}>Encore {this.state.timesheetsAmout} horaires à confirmer</Text>
                </View>
                {(this.state.uncheckedTimesheets && this.state.uncheckedTimesheets.length) ? (
                    this.state.uncheckedTimesheets.map((item) => (
                        <TimesheetCard item={item} getTimesheets={this.getTimesheets}></TimesheetCard>
                    ))
                ):  <View style={{paddingTop: "30px", justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>{this.state.noDataMessage}</Text>
                    </View>
                }
            </ScrollView>
        );
    }
}



TimesheetsList.contextType = UserContext;

export default TimesheetsList;