import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';

import { UserContext } from '../context/UserContext';
import ReportsList from './components/ReportsList';

class Reports extends Component {

    constructor(props){
        super(props);
        this.state = {
            sort: 'pharma'
        }
    }
    

    render() { 
        return (
            <ScrollView>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: "center"}}>
                    <Text>Faire un </Text>
                </View>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity style={style.buttonCheck} onPress={ () => this.setState({sort: 'pharma'})}>
                        <Text style={style.buttonText}>Pharmacheck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonCheck} onPress={ () => this.setState({sort: 'nova'})}>
                        <Text style={style.buttonText}>NovaCheck</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center", justifyContent: "center"}}>
                    <Text>à {this.context.selectedBase.name} </Text>
                </View>
                
                <View>
                    <ReportsList sort={this.state.sort}></ReportsList>    
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
});

Reports.contextType = UserContext;

export default Reports;