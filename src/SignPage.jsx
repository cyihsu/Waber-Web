import React from "react";
import './SignPage.css'
import './main.css'
import "bulma";
import {UserService} from "./api/UserService";
import {withRouter} from 'react-router-dom'
import {KEY_USER_ID} from "./consts";

const PASSENGER_TYPE = 'Passenger';
const DRIVER_TYPE = 'Driver';
const SIGN_UP_FORM = 100;
const SIGN_IN_FORM = 200;

const userService = new UserService();

function periodicallyUpdateLocation(userId) {
    setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                userService.updateLocation({
                    userId,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                    .catch(err => console.error(err));
            })
        }
    }, 3000)
}

function loginSuccessfully({history, userData}) {
    localStorage.setItem(KEY_USER_ID, userData.id);
    periodicallyUpdateLocation(userData.id);
    if (userData.carType) { // only the driver has the attribute 'carType'
        history.push('/driver');
    } else {
        history.push('/car-hailing');
    }
}

const SignUpAsPassengerForm = withRouter(({history, switchForm, switchType}) => {
    const submit = (e) => {
        e.preventDefault();
        userService.signUpAsPassenger({
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        }).then(res => loginSuccessfully({history, userData: res.data}));
    };
    return (
        <form className="sign-up-form" onSubmit={submit}>
            <input type="text" placeholder="name"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button type="submit">create</button>
            <p className="message">Already registered?
                <a className="ml-1" href="#" onClick={() => switchForm(SIGN_IN_FORM)}>
                    Sign In
                </a>
            </p>
            <div className="switch-sign-up-panel">
                <a href="#" onClick={() => switchType(DRIVER_TYPE)}>Sign Up as Driver</a>
            </div>
        </form>
    )
})

const SignUpAsDriverForm = withRouter(({history, switchForm, switchType}) => {
    const submit = (e) => {
        e.preventDefault();
        userService.signUpAsDriver({
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            carType: e.target[3].value
        }).then(res => loginSuccessfully({history, userData: res.data}));
    };
    return (
        <form className="sign-up-form" onSubmit={submit}>
            <input type="text" placeholder="name"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <div className="select mb-3 is-fullwidth">
                <select name="car type">
                    <option value="Normal">Normal</option>
                    <option value="Business">Business</option>
                    <option value="Sport">Sport</option>
                </select>
            </div>
            <button type="submit">create</button>
            <p className="message">Already registered?
                <a className="ml-1" href="#" onClick={() => switchForm(SIGN_IN_FORM)}>
                    Sign In
                </a>
            </p>
            <div className="switch-sign-up-panel">
                <a href="#" onClick={() => switchType(PASSENGER_TYPE)}>Sign Up as Passenger</a>
            </div>
        </form>
    )
});

const SignInForm = withRouter(({history, switchForm}) => {
    const submit = (e) => {
        e.preventDefault();
        userService.login({
            email: e.target[0].value,
            password: e.target[1].value,
        }).then(res => loginSuccessfully({history, userData: res.data}));
    };

    return (
        <form className="login-form" onSubmit={submit}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button type="submit">login</button>
            <p className="message">Not registered?
                <a className="ml-1" href="#" onClick={() => switchForm(SIGN_UP_FORM)}>
                    Create an account
                </a>
            </p>
        </form>
    )
})

export default function SignPage() {
    const [showingForm, switchForm] = React.useState(SIGN_IN_FORM);
    const [showingPanelType, switchType] = React.useState(PASSENGER_TYPE)

    const renderSpecificForm = function () {
        if (showingForm === SIGN_IN_FORM) {
            return <SignInForm switchForm={switchForm}/>;
        }
        if (showingForm === SIGN_UP_FORM) {
            if (showingPanelType === PASSENGER_TYPE) {
                return <SignUpAsPassengerForm switchForm={switchForm} switchType={switchType}/>;
            } else if (showingPanelType === DRIVER_TYPE) {
                return <SignUpAsDriverForm switchForm={switchForm} switchType={switchType}/>;
            }
        }
    }

    return (
        <div className="page">
            <div className="panel">
                {renderSpecificForm()}
            </div>
        </div>
    )
}
