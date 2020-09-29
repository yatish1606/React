import React from 'react'
import history from '../../history'
import Modal from '../commons/Modal'
import { fetchStream, deleteStream } from '../../actions'
import { connect } from 'react-redux'
import LoadingModal from '../commons/LoadingModal'

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    render() {
        
        return this.props.stream ? (
            <div>
                <Modal
                    title="Delete Stream?"
                    description={`Are you sure you want to delete '${this.props.stream.title}' ?`}
                    actions = {[
                        {name: 'Cancel', class: 'secondary', action:'goback', onClick: () => history.push('/')},
                        {name:'Delete', class:'primary',action:'goback', onClick:  () => this.props.deleteStream(this.props.match.params.id)},
                    ]}
                    onDismiss={() => history.push('/')}
                    stream={this.props.stream}
                />
            </div>
        ) : <LoadingModal/>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)