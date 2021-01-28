
const TYPE_DRIVER = 'driver'
const TYPE_PASSENGER = 'passenger'

class UserService {

    login({email, password}) {
        console.log('login: ' + email);
    }

    signUpAsPassenger({name, email, password}) {
        console.log('signUp: ' + name);
    }
}


export {TYPE_PASSENGER, TYPE_DRIVER, UserService}
