import React from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends React.Component {

    renderInput = (inputProps) => {
        return <input/>
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <form>
                    <Field
                        name='title'
                        component={this.renderInput}
                    />
                    <Field
                        name='description'
                        component={this.renderInput}
                    />
                </form>
            </div>
        )
    }  
}

export default reduxForm({form: 'streamCreate'})(StreamCreate)