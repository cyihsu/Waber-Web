import React from "react";
import './SignPage.css'
import "bulma";
import {TYPE_DRIVER, TYPE_PASSENGER, UserService} from "./api/UserService";

const PASSENGER_TYPE = 'Passenger';
const DRIVER_TYPE = 'Driver';
const SIGN_UP_FORM = 100;
const SIGN_IN_FORM = 200;

const userService = new UserService();


function SignUpAsPassengerForm({switchForm, switchType}) {
    const submit = (e) => {
        e.preventDefault();
        userService.signUpAsPassenger({
            type: TYPE_PASSENGER,

        })
    };
    return (
        <form className="sign-up-form" onSubmit={submit}>
            <input type="text" placeholder="name"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button type="submit">create</button>
            <p className="message">Already registered?
                <a href="#" onClick={() => switchForm(SIGN_IN_FORM)}>
                    Sign In
                </a>
            </p>
            <div className="switch-sign-up-panel">
                <a href="#" onClick={() => switchType(DRIVER_TYPE)}>Sign Up as Driver</a>
            </div>
        </form>
    )
}

function SignUpAsDriverForm({switchForm, switchType}) {
    const submit = (e) => {
        e.preventDefault();
        userService.signUpAsPassenger({
            type: TYPE_PASSENGER,
        })
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
                <a href="#" onClick={() => switchForm(SIGN_IN_FORM)}>
                    Sign In
                </a>
            </p>
            <div className="switch-sign-up-panel">
                <a href="#" onClick={() => switchType(PASSENGER_TYPE)}>Sign Up as Passenger</a>
            </div>
        </form>
    )
}

function SignInForm({switchForm}) {
    const submit = (e) => {
        e.preventDefault();
        userService.login({
            email: e.target[0].value,
            password: e.target[1].value,
        })
    };

    return (
        <form className="login-form" onSubmit={submit}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button type="submit">login</button>
            <p className="message">Not registered?
                <a href="#" onClick={() => switchForm(SIGN_UP_FORM)}>
                    Create an account
                </a>
            </p>
        </form>
    )
}

export default function SignPage() {
    const [showingForm, switchForm] = React.useState(SIGN_UP_FORM);
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
        <div className="login-page">
            <div className="form">
                { renderSpecificForm() }
            </div>
        </div>
    )
}
