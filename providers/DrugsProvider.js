import API from '../api/Api'

class DrugsProvider {
    
    getReports(token){
        return API.get('reports',{
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


export default DrugsProvider