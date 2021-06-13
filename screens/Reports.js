import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input, Card} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

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
    
    componentDidMount(){
        this.reportsProvider.getReports(this.context.token, this.context.selectedBase.id).then((result)=>
            this.setState({ pharma: result.pharma, nova: result.nova, displayList: result.pharma}),
            
        )
        console.log(this.state.pharma)
    }

    render() { 
        return (
            <ScrollView>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                    <Text>Faire un </Text>
                </View>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                    <TouchableOpacity style={style.buttonCheck} color="#841584" onPress={ () => this.setState({displayList: this.state.pharma})}>
                        <Text>Pharmacheck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonCheck} color="#841584" onPress={ () => this.setState({displayList: this.state.nova})}>
                        <Text>NovaCheck</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                <Text>à {this.context.selectedBase.name} </Text>
                </View>
                
                {(this.state.displayList) ? (
                    this.state.displayList.map((item, i) => (
                        <Card>
                            <Card.Title> {(item.nova) ?  'De '+item.drug+' de la nova '+item.nova : 'Du lot '+item.batch_number+' de '+item.drug}</Card.Title>
                            <Card.Divider/>
                                <View key={item.id}>
                                    <Text>{item.date}</Text>
                                </View>
                        </Card>
                    )))
                    : null
                }
                

                <View style={{flex:2}}>
                    
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

Reports.contextType = UserContext;

export default Reports;