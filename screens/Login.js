import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button , Input} from 'react-native-elements';

import axios from 'axios';
import LoginProvider from '../providers/LoginProvider';   
import { UserContext } from '../context/UserContext';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            bases: [],
            initials: null,
            password: null
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
        const data = new FormData();
        data.append("initials", this.state.initials);
        data.append("password", this.state.password);
        this.loginProvider.login(data).then((res) =>
            this.context.isLoggedIn(res)
        )
    }


    render() {
        
        return (
            <View>
                <View style={{flex:2}}>
                    <Input placeholder="Initiales" name="initials" onChange={val => this.setState({ initials: val.target.value })}/>
                    <Input secureTextEntry={true} placeholder="Mot de passe" onChange={val => this.setState({ password: val.target.value })}/>
                </View>
                <View style={{flex:2}}>
                    <Picker style={{marginTop: 10}}>
                        {this.state.bases.map(base =>
                            <Picker.Item label={base.name} value={base.id} />    
                        )}
                    </Picker>
                </View>

                <Button style={{marginTop: 10}} title="Connexion" color="#841584"  onPress={this.login}/>
            </View>
        );
    }
}


Login.contextType = UserContext;

export default Login;