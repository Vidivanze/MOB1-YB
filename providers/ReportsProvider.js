import API from '../api/Api'

class ReportsProvider {
    
    getReports(token, baseId){
        return API.get('missingchecks/'+baseId,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });
    }
    
}


export default ReportsProvider