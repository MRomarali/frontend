import axios from 'axios'


const INSTRUCTOR = 'Omar'
const Billing_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${Billing_API_URL}/instructors/${INSTRUCTOR}`


class BillingService {

    // eslint-disable-next-line
    retrieveBillings(name, id) {
        //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/billings`);
    }
}

export default new BillingService()