import axios from 'axios'

class BillingService {

    createBilling(name, calculate){
        //console.log('executed service')
        return axios.post(`http://localhost:8080/calculate`, calculate)
    }
    // eslint-disable-next-line
    retrieveBillings(name, calculate) {
        //console.log('executed service')
    return axios.get(`http://localhost:8080/calculate`, calculate);
    }
}
export default new BillingService()