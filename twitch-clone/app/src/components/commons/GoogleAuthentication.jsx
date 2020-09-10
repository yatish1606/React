import React from 'react'
import { LogIn, LogOut } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler'

import { GOOGLE_OAUTH_CLIENT_ID } from '../../config'

import '../../css/app.css'
import '../../css/Header.css'

class GoogleAuthentication extends React.Component {

    state = {
        isSignedIn : null,
        profileInfo : null,
        showAccount : false
    }  
    
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        // this.setWrapperRef = this.setWrapperRef.bind(this);
        // this.handleClickOutside = this.handleClickOutside.bind(this);
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
                    
                }
            })
        })

    }

    onAuthStateChange = () => this.setState({ isSignedIn : this.auth.isSignedIn.get()})

    googleSignOut = () => {
        window.gapi.auth2.getAuthInstance().signOut()
    }

    googleSignIn = () => {
        window.gapi.auth2.getAuthInstance().signIn()
    }        

    renderAuthButton() {
        switch(this.state.isSignedIn) {
            case null :
                return (
                    <div>null</div>
                )
            case true :
                return this.state.profileInfo ? (
                    <div className="header-profile" onClick={() => this.setState({showAccount : !this.state.showAccount})}>
                        <div className="header-profile-photo">
                            <img src={this.state.profileInfo.profilePhoto}/>
                        </div>
                        <div className="header-name">
                            {this.state.profileInfo.firstName}
                        </div>
                    </div>
                ) : null
            default :
                return (
                    <div>
                        <button 
                            className="btn primary"
                            onClick={this.googleSignIn}
                        >
                            <LogIn className="btn-icon" size={18} />
                            Sign In
                        </button>
                    </div>
                )
        }
    }

    render() {
    
        console.log(this.state.showAccount)

        return (
            <div>

                {this.renderAuthButton()}

                {
                    this.state.showAccount ? 
                    <OutsideClickHandler onOutsideClick={() => this.setState({ showAccount : false})}>
                    <div className='my-profile-dropdown-container'  ref={node => this.wrapperRef = node}>
                        <button className="btn primary" onClick={this.googleSignOut}>
                            <LogOut className="btn-icon" size={18} />
                            Sign Out
                        </button>
                    </div>
                    </OutsideClickHandler>
                    : null
                }
            </div>
        )
    }
}

export default GoogleAuthentication
