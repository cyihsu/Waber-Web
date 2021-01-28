import axios from "axios";

const TYPE_DRIVER = 'driver'
const TYPE_PASSENGER = 'passenger'

class UserService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            timeout: 5000
        });
    }

    async login({email, password}) {
        console.log('login: ' + email);
        return await this.axios.post('/api/users/signIn', {email, password});
    }

    async signUpAsPassenger({name, email, password}) {
        console.log('signUpAsPassenger');
        return await this.axios.post('/api/passengers', {
            name, email, password
        });
    }

    async signUpAsDriver({name, email, password, carType}) {
        console.log('signUpAsDriver');
        return await this.axios.post('/api/drivers', {
            name, email, password, carType
        });
    }
}


export {TYPE_PASSENGER, TYPE_DRIVER, UserService}
