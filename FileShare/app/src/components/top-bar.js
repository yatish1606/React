import React, { Component } from 'react'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import userProfilePic from '../images/user.png'

export default class TopBar extends Component {

    render() {
        return (
            <div className="app-top-bar">
                <div className="app-top-bar-inner">
                    <div className="app-top-bar-left">
                        <div className="site-name">
                            <SendRoundedIcon style={{fontSize:25, color:'#ffffff', transform:`rotate(-30deg)`,}}/>
                        </div>
                    </div>
                    <div className="app-top-bar-right">
                        <div className="app-top-bar-right-inner">
                            <div className="user-profile">
                                <div className="user-profile-picture">
                                    <img src={userProfilePic} alt=" " style={{width:30, height:30}}/>
                                </div>
                            </div>
                            <ul className="user-profile-menu">
                                <li className="user-signin-button" onClick={() => {
                                    if(this.props.showLoginForm) {
                                        this.props.showLoginForm(true)
                                    }
                                }}>Sign Up</li>
                            </ul>
                        </div>                
                    </div>
                </div>  
            </div>
        )
    }
}