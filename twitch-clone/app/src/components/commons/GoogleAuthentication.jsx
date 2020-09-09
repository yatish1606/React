import React from 'react'
import { GOOGLE_OAUTH_CLIENT_ID } from '../../config'

class GoogleAuthentication extends React.Component {

    state = {
        isSignedIn : null
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId : GOOGLE_OAUTH_CLIENT_ID,
                scope : 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({ isSignedIn : this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthStateChange)
            })
        })
    }

    onAuthStateChange = () => this.setState({ isSignedIn : this.auth.isSignedIn.get()})

    renderAuthButton() {
        switch(this.state.isSignedIn) {
            case null :
                return (
                    <div>null</div>
                )
            case true :
                return (
                    <div>true</div>
                )
            default :
                return (
                    <div>false</div>
                )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

export default GoogleAuthentication