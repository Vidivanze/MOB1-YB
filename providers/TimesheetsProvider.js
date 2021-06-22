import API from '../api/Api'

class TimesheetsProvider {
    
    getUncheckedTimesheets(token){
        return API.get('unconfirmedworkplans',{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(function (res) {
        })
        .catch(function (error) {
        });
    }

    countUncheckedTimesheets(token){
        API.get('unconfirmedworkplans',{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(function (res) {
            return res.lenght
        })
        .catch(function (error) {
        });
    }
    
    confirmWorkPlan(data, token){
        return API.post('confirmworkplan', data, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res)        
    }

}


export default TimesheetsProvider