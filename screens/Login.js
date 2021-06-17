import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';

import axios from 'axios';
import LoginProvider from '../providers/LoginProvider';   
import { UserContext } from '../context/UserContext';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            bases: [],
            initials: null,
            password: null,
            baseId: null,
            selectedBase: null,
        }
        
        this.loginProvider = new LoginProvider();
        
        this.login = this.login.bind(this);
    }
    
    componentDidMount(){
        this.loginProvider.getBases().then((result)=>
            this.setState({bases: result})
        )
    }

    login(){
        console.log(this.state.baseId)
        if(this.state.initials && this.state.password && this.state.baseId != '0'){
            this.state.bases.map((base) => {
                if(base.id == this.state.baseId){
                    this.setState({selectedBase: base})
                }
            });

            const data = new FormData();
            data.append("initials", this.state.initials);
            data.append("password", this.state.password);

            this.loginProvider.login(data).then((token) =>
                {if(token){
                    this.context.logMeIn(this.state.initials, token, this.state.selectedBase)

                    Toast.show({
                        position: 'top',
                        type: 'success',
                        text1: 'Vous êtes connecté',
                        text2: 'Bienvenue 👋'
                    })
                }else{
                    Toast.show({
                        position: 'top',
                        type: 'error',
                        text1: 'Identifiants incorrects'
                    })
                }}
            )
            
        }else{
            Toast.show({
                position: 'top',
                type: 'error',
                text1: 'Veuillez remplir tous les champs'
            })
        }
    }


    render() {
        return (
            <View style={[styles.container, { flexDirection: "column" }]}>
                <View style={{flex: 2}}>
                    <View style={{flex: 3}}></View>
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>Connexion</Text>
                    </View>
                </View>
                <View style={{flex: 8}}>
                    <View style={{paddingTop: "20px"}}>
                        <Input placeholder="Initiales" name="initials" onChange={val => this.setState({ initials: val.target.value })}/>
                        <Input secureTextEntry={true} placeholder="Mot de passe" onChange={val => this.setState({ password: val.target.value })}/>
                    </View>
                    <View style={{alignItems: 'center', paddingBottom: 10}}>
                        <Picker name="base" style={{ height: 35, width: 300, marginTop: 10}} onChange={val => this.setState({ baseId: val.target.value })}>
                            <Picker.Item label="Veuillez choisir une base" value="0" />
                            {(this.state.bases) ? (
                                this.state.bases.map(base =>
                                <Picker.Item key={base.name} label={base.name} value={base.id} />))
                                : null
                            }   
                        </Picker>
                    </View>
                    <Button style={{marginTop: 10}} title="Connexion"  onPress={this.login}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
  });


Login.contextType = UserContext;

export default Login;