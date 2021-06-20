import API from '../api/Api'

class ConsultationsProvider {
    
    getReports(token){
        return API.get('reports',{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(res => res.data)
    }

    getReportActionsInShift(token, id){
        return API.get('myactionsinshift/'+id,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(res => res.data.data)
    }
    
}


export default ConsultationsProvider