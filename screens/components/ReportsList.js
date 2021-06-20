import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView} from 'react-native';
import Moment from 'moment';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/UserContext';

import ReportsProvider from '../../providers/ReportsProvider';
import ReportCard from './ReportCard';

class ReportsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            pharma: [],
            nova: [],
            sort: 'pharma',
            refresh: false
        }

        this.reportsProvider = new ReportsProvider();
        
        this.getReports = this.getReports.bind(this);
    }
    

    componentDidMount(){
        this.getReports()
    }

    getReports(){
        this.reportsProvider.getReports(this.context.token, this.context.selectedBase.id).then((result)=>{
                //Without this line, only the last element disapear
                this.setState({ pharma: [], nova: []});
                this.setState({ pharma: result.pharma, nova: result.nova});
            }
        )
    }

    render() { 
        Moment.locale('fr');
        return (
            <ScrollView>
                {(this.props.sort == "pharma") ? (
                    (this.state.nova) ? (
                        this.state.pharma.map((item) => (
                        <ReportCard sort={this.props.sort} item={item} getReports={this.getReports}></ReportCard>
                        )))
                    : <Text>Il n'y a pas de rapport pharma</Text>
                ): null
                }

                {(this.props.sort == "nova") ? (
                    (this.state.nova) ? (
                        this.state.nova.map((item) => (
                        <ReportCard sort={this.props.sort} item={item} getReports={this.getReports}></ReportCard>
                        )))
                    : <Text>Il n'y a pas de rapport nova</Text>
                    
                ): null
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

ReportsList.contextType = UserContext;

export default ReportsList;