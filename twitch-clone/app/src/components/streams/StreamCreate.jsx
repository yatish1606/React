import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import '../../css/app.css'
import { createStream } from '../../actions'

class StreamCreate extends React.Component {

    renderError = ({touched, error}) => {
        if(touched && error) {
            return <div className='error-message'>{error}</div>
        }
    }

    renderInput = formProps => {
        return (
            <div className="form-field">
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"/>
                {this.renderError(formProps.meta)}
            </div> 
        ) 
    }

    onSubmit = formValues => {
        this.props.createStream(formValues)
    }

    render() {
        // console.log(this.props)
        return (
            <div className="container">
                <div className="two-part-container">
                    <div className="half-container">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <Field
                                name='title'
                                component={this.renderInput}
                                label='Enter the title of your stream'
                            />
                            <Field
                                name='description'
                                component={this.renderInput}
                                label='Enter a brief description about it'
                            />
                            <button className="btn primary no-icon">Create</button>
                        </form>
                    </div>
                    <div className="half-container">

                    </div>
                </div>
                
            </div>
        )
    }  
}

const validate = formValues => {
    let errors = {}
    if(!formValues.title) {
        errors.title = 'You must enter a title'
    }
    if(!formValues.description) {
        errors.description = 'You must enter a description'
    }
    return errors
}

const wrappedForm = reduxForm({form: 'streamCreate', validate: validate})(StreamCreate)

export default connect(null, {createStream})(wrappedForm)