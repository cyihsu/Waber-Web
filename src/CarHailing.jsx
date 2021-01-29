import './CarHailing.css'
import './main.css'
import React, {useEffect} from "react";



const MatchingStatusView = ({destination}) => {
    useEffect(() => {
        console.log(`N ${destination.latitude}, E ${destination.longitude}`);

    });
    return (
        <div className="matchingStatusView mt-3">
            Matching ...
        </div>
    )
}

export default function CarHailing() {
    let [matching, setMatching] = React.useState(false);
    let [destination, setDestination] = React.useState({latitude: 0, longitude: 0})

    const startMatching = (e) => {
        e.preventDefault();
        setDestination({
            latitude: e.target[0].value,
            longitude: e.target[1].value
        })
        setMatching(true);
    }

    return (
        <div className="page">
            <div className="panel py-4">
                <section className="hero is-link mb-2">
                    <div className="hero-body">
                        <p className="title">
                            Hi
                        </p>
                        <p className="subtitle">
                            Where are you going to go?
                        </p>
                    </div>
                </section>
                <form onSubmit={startMatching}>
                    <input type="number" disabled={matching} placeholder="latitude" defaultValue="25.047"/>
                    <input type="number" disabled={matching} placeholder="longitude" defaultValue="121.51"/>
                    <button type="submit">Go!</button>
                </form>
                {matching ? <MatchingStatusView destination={destination}/> : null}
            </div>
        </div>
    );
}

