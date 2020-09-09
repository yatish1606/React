import React from 'react'
import { LogIn } from 'react-feather';

import { GOOGLE_OAUTH_CLIENT_ID } from '../../config'

import '../../css/app.css'

class GoogleAuthentication extends React.Component {

    state = {
        isSignedIn : null,
        profileInfo : null
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId : GOOGLE_OAUTH_CLIENT_ID,
                scope : 'profile email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({ isSignedIn : this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthStateChange)

                if(this.state.isSignedIn) {
            
                    const profileInfo = this.auth.currentUser.get().getBasicProfile()
                    const profile = {
                        firstName : profileInfo.GV,
                        lastName : profileInfo.HT,
                        ID : profileInfo.Ad,
                        profilePhoto : profileInfo.jK
                    }
                    this.setState({profileInfo : profile})
                    console.log(this.state.profileInfo)
                }
            })
        })

    }

    onAuthStateChange = () => this.setState({ isSignedIn : this.auth.isSignedIn.get()})

    googleSignOut = () => window.gapi.auth2.getAuthInstance().signOut()

    googleSignIn = () => window.gapi.auth2.getAuthInstance().signIn()

    renderAuthButton() {
        switch(this.state.isSignedIn) {
            case null :
                return (
                    <div>null</div>
                )
            case true :
                return (
                    <div>
                        {/* <button 
                            className="btn primary"
                            onClick={() => this.googleSignOut()}
                        >Sign In</button> */}
                        true
                    </div>
                )
            default :
                return (
                    <div>
                        <button 
                            className="btn primary"
                            onClick={() => this.googleSignIn()}
                        >
                            <LogIn className="btn-icon" size={18} />
                            Sign In
                        </button>
                    </div>
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