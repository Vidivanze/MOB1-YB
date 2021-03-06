import API from '../api/Api'

class ReportsProvider {
    
    getReports(token, baseId){
        return API.get('missingchecks/'+baseId,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(function (res) {
            let nova = [...res.data.nova];
            let pharma = [...res.data.pharma];
            return {nova: nova, pharma: pharma};
        })
        .catch(function (error) {
        });
    }
    
    saveNovaReport(data, token){
        return API.post('novacheck', data, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res)        
    }

    savePharmaReport(data, token){
        return API.post('pharmacheck', data, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res)
        
    }
}


export default ReportsProvider