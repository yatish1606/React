import React from 'react'
import { GOOGLE_OAUTH_CLIENT_ID } from '../../config'

class GoogleAuthentication extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId : GOOGLE_OAUTH_CLIENT_ID,
                scope : 'email'
            })
        })
    }


    render() {
        return (
            <div>
                Login
            </div>
        )
    }
}

export default GoogleAuthentication