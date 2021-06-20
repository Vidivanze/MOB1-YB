import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Component } from 'react';
import { Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../../context/UserContext';
import Login from "../Login";
import Home from "../Home";
import Consultations from '../Consultations';
import ConsultationDetails from '../ConsultationDetails';
import Reports from '../Reports';


const Stack = createStackNavigator();

//Login
export class LoginStackNavigator extends Component{
  render(){
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#rgb(32, 137, 220)",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}>
        <Stack.Screen name="CSU APP" component={Login} />
      </Stack.Navigator>
    );
  }
}

//Call the tab navigator home
export class HomeStackNavigator extends Component{
  render(){ 
    return (<Home></Home>);
  }
}

//Consultations component is from the tab navigator
export class ConsultationsStackNavigator extends Component{
  render(){
    return (
      <DefaultStackNavigator>
        <Stack.Screen name="List" component={Consultations} />
        <Stack.Screen name="Details" component={ConsultationDetails} />
      </DefaultStackNavigator>
    );
  }
}

//Reports component is from the tab navigator
export class ReportsStackNavigator extends Component{
  render(){
    return (
      <DefaultStackNavigator>
        <Stack.Screen name="List" component={Reports} />
      </DefaultStackNavigator>
    );
  } 
}

//Default stack navigator
export class DefaultStackNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  setModalVisible(state){
    this.setState({modalVisible: state})
  }

  render(){
    return (
      <Stack.Navigator screenOptions={{     
        headerStyle: {
          backgroundColor: "#rgb(32, 137, 220)",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
        headerRight: () => (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Êtes-vous sur de vouloir vous déconnecter ?</Text>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Pressable style={[styles.button, styles.buttonLogout]} onPress={() => this.context.logMeOut()}>                 
                      <Text style={styles.textStyle}>Déconnexion</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                      <Text style={styles.textStyle}>Annuler</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

            <Text style={styles.userInfos}>{this.context.initials}@{this.context.selectedBase.name}   
              <Ionicons name="log-out-outline" size="30px" onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.logOutIcon}></Ionicons>
            </Text>
          </View>
        ),
      }}>
        {this.props.children}
      </Stack.Navigator>
    );

  }
}

const styles = StyleSheet.create({
  logOutIcon: {
    paddingLeft: '15px', 
    paddingRight: '15px',
    paddingTop: '20px'
  },

  userInfos: {
      color: "#fff",
      alignContent: 'center'
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 10,
  },
  buttonLogout: {
    backgroundColor: "#f04048",
    marginRight: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
  

DefaultStackNavigator.contextType = UserContext;
