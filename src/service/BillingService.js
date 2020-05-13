import axios from 'axios'

const INSTRUCTOR = 'Omar'
const INSTRUCTOR_API_URL = `/instructors/${INSTRUCTOR}`

class BillingService {

    // eslint-disable-next-line
    retrieveBillings(name, id) {
        //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/billings`);
    }
}

export default new BillingService()