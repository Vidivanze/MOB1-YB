import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';
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
            this.setState({ pharma: result.pharma, nova: result.nova, displayList: result.pharma})
        )
    }

    render() { 
        return (
            <ScrollView>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                    <Text>Faire un </Text>
                </View>
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                    <TouchableOpacity style={style.buttonCheck} color="#841584" onPress={ () => this.setState({reports: this.state.shifts})}>
                        <Text>Pharmacheck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonCheck} color="#841584" onPress={ () => this.setState({reports: this.state.drugs})}>
                        <Text>NovaCheck</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{flex: 6, flexDirection: "row", alignContent: "spave-between", alignItems: "center"}}>
                <Text>à {this.context.selectedBase.name} </Text>
                </View>
                

                <View style={{flex:2}}>
                    {(this.state.displayList) ? (
                        this.state.displayList.map((item, i) => (
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

Reports.contextType = UserContext;

export default Reports;