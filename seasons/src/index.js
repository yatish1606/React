import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = () => {

    const [latitude, setLatitude] = useState(null)

    window.navigator.geolocation.getCurrentPosition(
        onSuccess => setLatitude(onSuccess.coords.latitude),
        onError => setLatitude(null)
    )

    return (
        <div>Hi there, your latutde is {latitude}</div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)