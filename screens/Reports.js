import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input, Card} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import Moment from 'moment';

import { UserContext } from '../context/UserContext';

import ReportsProvider from '../providers/ReportsProvider';

class Reports extends Component {

    constructor(props){
        super(props);
        this.state = {
            pharma: [],
            nova: [],
            displayList: []
        }

        this.reportsProvider = new ReportsProvider();
    }
    

    saveReport(novaId, drugsheetId, start, end, date, drug_id){
        if(novaId > 0){
            
        }else if(drugsheetId > 0){
            
        }
    }


    componentDidMount(){
        this.reportsProvider.getReports(this.context.token, this.context.selectedBase.id).then((result)=>
            this.setState({ pharma: result.pharma, nova: result.nova, displayList: result.pharma})
        )
        console.log(this.state.pharma)
    }

    render() { 
        Moment.locale('fr');
        return (
            <ScrollView>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: "center"}}>
                    <Text>Faire un </Text>
                </View>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity style={style.buttonCheck} onPress={ () => this.setState({displayList: this.state.pharma})}>
                        <Text style={style.buttonText}>Pharmacheck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonCheck} onPress={ () => this.setState({displayList: this.state.nova})}>
                        <Text style={style.buttonText}>NovaCheck</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: "center"}}>
                    <Text>à {this.context.selectedBase.name} </Text>
                </View>
                
                {(this.state.displayList) ? (
                    this.state.displayList.map((item, i) => (
                        <Card>
                            <Card.Title> {(item.nova) ?  'De '+item.drug+' de la nova '+item.nova : 'Du lot '+item.batch_number+' de '+item.drug}</Card.Title>
                            <Card.Divider/>
                                <View key={item.id} style={{alignItems: "center"}}>
                                    <Text>pour le {Moment(item.date).format('D MMMM')}</Text>
                                </View>
                                
                                <View style={style.amountHeader}>
                                    <Text style={{paddingRight: "85px"}}>Jour</Text>
                                    <Text style={{paddingLeft: "40px"}}>Nuit</Text>
                                </View>
                                
                                <View style={style.amountInputDisplay} >
                                    <InputSpinner step={1}
                                        color={"#2089dc"}
                                        colorMin={"#f04048"}
                                        value={item.start}
                                        onChange={(num) => {
                                            console.log(num);
                                        }}
                                        skin={"Modern"}
                                        style={{marginLeft: "5px"}}
                                    />
                                    
                                    <InputSpinner step={1}
                                        color={"#2089dc"}
                                        colorMin={"#f04048"}
                                        value={item.end}
                                        onChange={(num) => {
                                            console.log(num);
                                        }}
                                        skin={"Modern"}
                                        style={{marginLeft: "5px"}}
                                    />
                                </View>

                                <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
                                    <TouchableOpacity style={style.sendButton} onPress={this.saveReport()}>
                                        <Text style={style.buttonText}>Envoyer</Text>
                                    </TouchableOpacity>
                                </View>

                        </Card>
                    )))
                    : null
                }
                
            </ScrollView>
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

Reports.contextType = UserContext;

export default Reports;