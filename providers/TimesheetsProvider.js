import API from '../api/Api'

class TimesheetsProvider {
    
    getUncheckedTimesheets(token){
        return API.get('unconfirmedworkplans',{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }).then(res => res.data)  
        .catch(function (error) {
        });
    }

    countUncheckedTimesheets(token){
        return API.get('unconfirmedworkplans',{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }).then(res => res.data.length)  
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