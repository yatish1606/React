import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import '../../css/app.css'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <StreamForm onSubmit={this.onSubmit} title="Create a new stream" />
            </div>
        )
    }  
}

export default connect(null, {createStream})(StreamCreate)