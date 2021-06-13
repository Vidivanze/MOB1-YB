import React, { Component } from 'react';
import { View } from 'react-native';
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
        console.log(this.state.baseId);
        this.state.bases.map((base) => {
            if(base.id == this.state.baseId){
                console.log(base)
                this.setState({selectedBase: base})
            }
        });

        
        if(this.state.baseId != 0){
            const data = new FormData();
            data.append("initials", this.state.initials);
            data.append("password", this.state.password);

            this.loginProvider.login(data).then((res) =>
                this.context.logMeIn(res, this.state.selectedBase)
            )
            
    
            Toast.show({
                position: 'top',
                type: 'success',
                text1: 'Hello',
                text2: 'This is some something 👋'
            })

        }else{
            Toast.show({
                position: 'top',
                type: 'error',
                text1: 'Veuillez choisir une base'
            })
        }
       
    }


    render() {
        
        return (
            <View>
                <View style={{flex:2}}>
                    <Input placeholder="Initiales" name="initials" onChange={val => this.setState({ initials: val.target.value })}/>
                    <Input secureTextEntry={true} placeholder="Mot de passe" onChange={val => this.setState({ password: val.target.value })}/>
                </View>
                <View style={{flex:2}}>
                    <Picker name="base" style={{marginTop: 10}} onChange={val => this.setState({ baseId: val.target.value })}>
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
        );
    }
}


Login.contextType = UserContext;

export default Login;