import React from 'react';
import './App.scss';
import SignPage from "./SignPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CarHailing from "./CarHailing";
import DriverHome from "./DriverHome";

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact={true} path="/" component={SignPage}/>
                <Route exact={true} path="/car-hailing" component={CarHailing}/>
                <Route exact={true} path="/driver" component={DriverHome}/>
            </div>
        </Router>
    );
}

export default App;
