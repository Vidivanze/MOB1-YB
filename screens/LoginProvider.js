import axios from 'axios';
import API from '../api/Api'

class LoginProvider {

    getBases(){
        return API.get('bases')
        .then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
    }

    login(data){
        API.post('gettoken', data, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(res =>{
            console.log(res)
            
        }).catch(function (error) {
            console.log(error);
        });
        
    }
}

export default LoginProvider