import React, { Component } from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

export default class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLogin : true,
            user : {
                name:'',
                email:'',
                password:'',
                confirmPassword:'',
            }
        }

        this._onSubmit = this._onSubmit.bind(this)
        this._onTextFieldChange = this._onTextFieldChange.bind(this)
    }

    _onSubmit = (event) => {
        event.preventDefault()
        const {isLogin, user} = this.state
        console.log(user)

    }

    _onTextFieldChange = (event) => {
        const {user} = this.state
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    render() {

        const {isLogin, user} = this.state
        const title = isLogin ? 'Sign In' : 'Sign Up'
        return (
            <div className="app-login-form">
                <div className="app-login-form-inner">
                    <button onClick={() => {
                        if(this.props.onClose) {
                            this.props.onClose()
                        }
                    }} className="app-dismiss-button"><ArrowBackRoundedIcon fontSize="20"/></button>
                    <h2>{title}</h2>
                    <form onSubmit={this._onSubmit}>
                        {
                            !isLogin ?
                            <div>
                                <div className="app-form-item">
                                    <label htmlFor="name-id">Name</label>
                                    <input value={user.name} onChange={this._onTextFieldChange} placeholder="Enter your name" type="text" id="name-id" name="name" />
                                </div>
                            </div> : null
                        }
                        <div className="app-form-item">
                            <label htmlFor="email-id">Email</label>
                            <input value={user.email} onChange={this._onTextFieldChange} placeholder="Enter email ID" type="email" id="email-id" name="email" />
                        </div>
                        <div className="app-form-item">
                            <label htmlFor="password-id">Password</label>
                            <input value={user.password} onChange={this._onTextFieldChange} placeholder="Enter password" type="password" id="password-id" name="password" />
                        </div>

                        {
                            !isLogin ? <div>
                                <div className="app-form-item">
                                    <label htmlFor="confirm-password-id">Password</label>
                                    <input value={user.confirmPassword} onChange={this._onTextFieldChange} placeholder="Enter password again" type="password" id="confirm-password-id" name="confirmPassword" />
                                </div>
                            </div> : null
                        }
                        {
                            isLogin ? 
                            <div className="app-form-actions">
                                <button className="app-button primary">Sign In</button>
                                <div className="app-form-description">Don't have an account ?
                                    <button type="button" onClick={() => this.setState({isLogin:false})} className="app-button app-button-link">Sign Up</button>
                                </div>
                                
                            </div>
                            :
                            <div className="app-form-actions">
                                <button className="app-button primary">Sign Up</button>
                                <div className="app-form-description">Already have an account ?
                                    <button type="button" onClick={() => this.setState({isLogin:true})} className="app-button app-button-link">Sign In</button>
                                </div>
                                
                            </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}