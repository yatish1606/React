import React from 'react'
import history from '../../history'
import Modal from '../commons/Modal'
import { fetchStream } from '../../actions'
import { connect } from 'react-redux'


class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    render() {
        
        return (
            <div>
                <Modal
                    title="Delete Stream?"
                    description="Are you sure you want to delete this stream?"
                    actions = {[
                        {name: 'Cancel', class: 'secondary', action:'goback', onClick: () => history.push('/')},
                        {name:'Delete', class:'primary',action:'goback', onClick: () => history.push('/')},
                    ]}
                    onDismiss={() => history.push('/')}
                    stream={this.props.stream}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamDelete)