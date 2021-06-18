import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input, Card} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import Moment from 'moment';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/UserContext';

import ReportsProvider from '../../providers/ReportsProvider';

class ReportCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: [],
            start: "",
            end: ""
        }

        this.reportsProvider = new ReportsProvider();
    }
    
    componentDidMount(){
        this.setState({ item: this.props.item, start: this.props.item.start, end: this.props.item.end })
    }

    saveReport(){
        //If item is a pharmacheck
        if(this.props.sort == 'pharma'){
            const pharmaReport = new FormData();
            pharmaReport.append("batch_id", this.state.item.batch_id);
            pharmaReport.append("drugsheet_id", this.state.item.drugsheet_id);
            pharmaReport.append("start", this.state.start);
            pharmaReport.append("end", this.state.end);
            pharmaReport.append("date", this.state.item.date);

            try{
                this.reportsProvider.savePharmaReport(pharmaReport, this.context.token).then((res) =>{
                    Toast.show({
                        position: 'bottom',
                        type: 'success',
                        text1: 'Rapport modifié',
                    });
                    this.props.getReports();
                }
                )
            }catch(exception){
                Toast.show({
                    position: 'top',
                    type: 'error',
                    text1: 'erreur d\'enregistrement',
                })
            }

        //If item is a novacheck
        }else if(this.props.sort == 'nova'){
            const novaReport = new FormData();
            novaReport.append("nova_id", this.state.item.nova_id);
            novaReport.append("drugsheet_id", this.state.item.drugsheet_id);
            novaReport.append("start", this.state.start);
            novaReport.append("end", this.state.end);
            novaReport.append("date", this.state.item.date);
            novaReport.append("drug_id", this.state.item.drug_id);

            try{
                this.reportsProvider.saveNovaReport(novaReport, this.context.token).then((res) =>{
                    Toast.show({
                        position: 'bottom',
                        type: 'success',
                        text1: 'Rapport modifié',
                    });
                    this.props.getReports();
                }
              )
            }catch(exception){
                Toast.show({
                    position: 'top',
                    type: 'error',
                    text1: 'erreur d\'enregistrement',
                })
            }
        }
       
    }



    render() { 
        Moment.locale('fr');
        return (
            <Card>
                <Card.Title> {(this.props.sort == 'pharma') ? 'Du lot '+this.state.item.batch_number+' de '+this.state.item.drug : 'De '+this.state.item.drug+' de la nova '+this.state.item.nova }</Card.Title>
                <Card.Divider/>
                    <View style={{alignItems: "center"}}>
                        <Text>pour le {Moment(this.state.item.date).format('D MMMM')}</Text>
                    </View>
                    
                    <View style={style.amountHeader}>
                        <Text style={{paddingRight: "85px"}}>Jour</Text>
                        <Text style={{paddingLeft: "40px"}}>Nuit</Text>
                    </View>
                    
                    <View style={style.amountInputDisplay} >
                        <InputSpinner step={1}
                            color={"#2089dc"}
                            colorMin={"#f04048"}
                            value={this.state.item.start}
                            onChange={(val) => {
                                this.setState({start: val})
                            }}
                            skin={"Modern"}
                            style={{marginLeft: "5px", height: 15}}
                        />
                        
                        <InputSpinner step={1}
                            color={"#2089dc"}
                            colorMin={"#f04048"}
                            value={this.state.item.end}
                            onChange={(val) => {
                                this.setState({end: val})
                            }}
                            skin={"Modern"}
                            style={{marginLeft: "5px"}}
                        />
                    </View>

                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
                        <TouchableOpacity style={style.sendButton} onPress={() => this.saveReport()}>
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

ReportCard.contextType = UserContext;

export default ReportCard;