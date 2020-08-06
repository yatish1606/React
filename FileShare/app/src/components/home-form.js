import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import {upload} from '../helpers/upload'
import image from '../images/image.png'
import imageError from '../images/image-error.png'
import PropTypes from 'prop-types'
import {_isEmail} from '../helpers/isEmail'

class HomeForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            form : {
                files : [],
                from:'',
                to:'',
                message:''
            },
            errors : {
                to:null,
                from:null,
                message:null,
                files: null
            },
            errorFound:false
        }

        this._onChangeText = this._onChangeText.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
        this._formValidation = this._formValidation.bind(this)
        this._onFileAdded = this._onFileAdded.bind(this)
        this._onFileRemove = this._onFileRemove.bind(this)
    
    }

    
    _formValidation(fields = [], callback = () => {}) {

        let {form, errors} = this.state

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
            ],
            to : [
                {
                    errorMessage: 'To is required',
                    isValid: () => {
                        return form.to.length
                    }
                },
                {
                    errorMessage: 'Email is invalid',
                    isValid: () => {
                        return this._isEmail(form.to)
                    }
                }
            ],
            files : [
                {
                    errorMessage: 'File is required',
                    isValid: () => {
                        return form.files.length
                    }
                }
            ]
        }

        _.each(fields, (field) => {
            // same as fieldValidations = validations[field]
            let fieldValidations = _.get(validations, field)

            errors[field] = null

            _.each(fieldValidations, (fieldValidation) => {
                const isValid = fieldValidation.isValid()
                if(!isValid) {
                    errors[field] = fieldValidation.errorMessage
                }
            })
        })
        this.setState({errors: errors}, () => {
            let isValid = true
            _.each(errors, (error) => {
                if(error !== null){
                    isValid = false
                }
            })
            return callback(isValid)
        })
    }

    _onFileAdded(event) {

        let files = _.get(this.state, 'form.files', [])

        _.each(_.get(event, 'target.files', []), (file) => {
            files.push(file)
        })

        this.setState({
            form: {
                ...this.state.form,
                files: files
            }
        }, () => {
            this._formValidation(['files'], (isValid) => {

            })
        })
        console.log(this.state.form)
    }

    _onFileRemove(index) {
        let {files} = this.state.form

        files.splice(index, 1)
        this.setState({
            form: {
                ...this.state.form,
                files: files
            }
        })
    }

    _onSubmit(event) {
        event.preventDefault()
        this._formValidation(['from', 'to', 'files'], (isValid) => {
            if(isValid){
                const data = this.state.form
                if(this.props.onUploadBegin){
                    this.props.onUploadBegin(data)
                }
                upload(data, (event) => {
                    if(this.props.onUploadEvent){
                        this.props.onUploadEvent(event)
                    }
                })
            } else {
                this.setState({errorFound:true})
            }
        })
    }

    _onChangeText(event) {
        
        let {form} = this.state
        const fieldName = event.target.name
        const fieldValue = event.target.value

        form[fieldName] = fieldValue

        this.setState({form:form})
    }
    
    render() {

        const {form, errors} = this.state
        const {files} = form

        return (
            <div className="app-card">
                <form onSubmit={this._onSubmit}>
                    <div className="app-card-header">
                        <div className="app-card-header-inner">

                            {
                                files.length ? 
                                <div className="app-files-selected">
                                    {
                                        files.map((file, index) => {
                                            return (
                                            <div key={index} className="app-files-selected-item">
                                                <div className="filename">{file.name}</div>
                                                <div className="file-action"><button onClick={() => this._onFileRemove(index)} type="button" className="app-file-remove">X</button></div>
                                            </div>
                                            )
                                        })
                                    }   
                                </div>
                                : null

                            }
                            
                            
                            <div className={classNames("app-file-select-zone", {'error': _.get(errors,'files')})} >
                                <label htmlFor="input-file">
                                    <input onChange={this._onFileAdded} id={'input-file'} type="file" multiple={true}></input>
                                    
                                    {
                                        files.length ? 
                                        <span className={"app-upload-description text-uppercase"}>Add more files</span> 
                                        :
                                        <span>
                                            <span className="app-upload-icon"><img src={this.state.errorFound ? imageError : image} alt='get-image' width={30} height={30}/></span>
                                            <span className="app-upload-description">Drag and drop your files here</span>
                                        </span>
                                    }   
                                </label>
                            </div>            
                        </div>
                    </div>
                    <div className="app-card-content">
                        <div className="app-card-content-inner">
                            <div className={classNames('app-form-item', {'error': _.get(errors, 'to')})}>
                                <label htmlFor="to">SEND TO</label>
                                <input onChange={this._onChangeText} value={form.to} name="to" placeholder={_.get(errors, 'to') ? _.get(errors, 'to') : "Email address"} type="text" id="to"></input>
                            </div>
                              
                            <div className={classNames('app-form-item', {'error': _.get(errors, 'from')})}>
                                <label htmlFor="from">FROM</label>
                                <input onChange={this._onChangeText} value={form.from} name="from" placeholder={_.get(errors, 'from') ? _.get(errors, 'from') : "Your email address here"} type="text" id="from"></input>
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

HomeForm.propTypes = {
    onUploadBegin : PropTypes.func,
    onUploadEvent : PropTypes.func
}

export default HomeForm