import React, { Component } from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

export default class LoginForm extends Component {
    render() {
        return (
            <div className="app-login-form">
                <div className="app-login-form-inner">
                    <button onClick={() => {
                        if(this.props.onClose) {
                            this.props.onClose()
                        }
                    }} className="app-dismiss-button"><ArrowBackRoundedIcon fontSize="20"/></button>
                    <h2>Sign In</h2>
                    <form>
                        <div className="app-form-item">
                            <label htmlFor="email-id">Email</label>
                            <input placeholder="Enter email ID" type="email" id="email-id" name="email" />
                        </div>
                        <div className="app-form-item">
                            <label htmlFor="password-id">Password</label>
                            <input placeholder="Enter password" type="password" id="password-id" name="password" />
                        </div>
                        <div className="app-form-actions">
                            <button className="app-button primary">Sign In</button>
                            <div className="app-form-description">Don't have an account ?</div>
                            <button className="app-button">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}