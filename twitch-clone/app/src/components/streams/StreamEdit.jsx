import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'

import StreamForm from './StreamForm'

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = formValues => {
        console.log(formValues)
    }

    render() {
        console.log(this.props)
        
        let { stream } = this.props

        if(!this.props.stream) {
            return null
        }
        
        return (

            <div>
                <StreamForm 
                    title="Edit your stream info" 
                    onSubmit={this.onSubmit}
                    initialValues={stream}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream : state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit)