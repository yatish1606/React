import React from 'react'
import { LogIn, LogOut } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler'
import { connect } from 'react-redux'

import { GOOGLE_OAUTH_CLIENT_ID } from '../../config'
import { signIn, signOut } from '../../actions'

import '../../css/app.css'
import '../../css/Header.css'

class GoogleAuthentication extends React.Component {

    state = {
        profileInfo : null,
        showAccount : false
    }  
    
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
    }

        
    componentDidMount() {
        
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId : GOOGLE_OAUTH_CLIENT_ID,
                scope : 'profile email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthStateChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthStateChange)

                if(this.props.isSignedIn) {
            
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

    onAuthStateChange = isSignedIn => isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut() 

    googleSignOut = () => {
        // window.gapi.auth2.getAuthInstance().signOut()
        this.auth.signOut()
        this.setState({showAccount: false})
    }

    googleSignIn = () => {
        // window.gapi.auth2.getAuthInstance().signIn()
        this.auth.signIn()
    }        

    renderAuthButton() {
        switch(this.props.isSignedIn) {
            case null :
                return null
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

const mapStateToProps = state => {
    console.log(state)
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuthentication)
