import React, { Component } from 'react'
import _ from 'lodash'

export default class HomeForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            form : {
                from:'',
                to:'',
                message:''
            },
            errors : {
                to:null,
                from:null,
                message:null
            }
        }

        this._onChangeText = this._onChangeText.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
        this._formValidation = this._formValidation.bind(this)
    
    }

    _isEmail(email) {
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailRegex.test(email)
    }

    _formValidation(fields = []) {

        const {form} = this.state

        const validations = {
            from : [
                {
                    errorMessage: 'From is required',
                    isValid: () => {
                        return form.from.length
                    }
                },
                {
                    errorMessage: 'Email is invalid',
                    isValid: () => {
                        return this._isEmail(form.from)
                    }
                }
            ]
        }

    }

    _onSubmit(event) {
        event.preventDefault()
        console.log(this.state.form)
    }

    _onChangeText(event) {
        
        let {form} = this.state
        const fieldName = event.target.name
        const fieldValue = event.target.value

        form[fieldName] = fieldValue

        this.setState({form:form})
    }
    
    render() {

        const {form} = this.state

        return (
            <div className="app-card">
                <form onSubmit={this._onSubmit}>
                    <div className="app-card-header">
                        <div className="app-card-header-inner">
                            <div className="app-file-select-zone">
                                <label htmlFor="input-file">
                                    <input id={'input-file'} type="file" multiple={true}></input>
                                    <span className="app-upload-icon"/>
                                    <span className="app-upload-description">Drag and drop your files here</span>
                                </label>
                            </div>            
                        </div>
                    </div>
                    <div className="app-card-content">
                        <div className="app-card-content-inner">
                            <div className="app-form-item">
                                <label htmlFor="to">SEND TO</label>
                                <input onChange={this._onChangeText} value={form.to} name="to" placeholder="Email address here" type="text" id="to"></input>
                            </div>
                              
                            <div className="app-form-item">
                                <label htmlFor="from">FROM</label>
                                <input onChange={this._onChangeText} value={form.from} name="from" placeholder="Your email address here" type="text" id="to"></input>
                            </div>
                                        
                            <div className="app-form-item">
                                <label htmlFor="message">MESSAGE</label>
                                <textarea onChange={this._onChangeText} value={form.message} placeholder="Add an optional message" name="message" id="message"></textarea>
                            </div>

                            <div className="app-form-actions">
                                <button className={"app-button primary"} type="submit">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}