import axios from 'axios'

const INSTRUCTOR = 'Omar'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`

class BillingService {

//
// eslint-disable-next-line
    retrieveBillings(name, id) {
        //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/billings/${id}`);
    }
//
    // eslint-disable-next-line
    updateBillings(name, id, billing) {
        //console.log('executed service')
        return axios.put(`${INSTRUCTOR_API_URL}/billings/${id}`, billing);
    }

    // eslint-disable-next-line
    createBillings(name, billing) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/billings/`, billing);
    }
}

export default new BillingService()