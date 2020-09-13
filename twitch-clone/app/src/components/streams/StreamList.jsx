import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchStreams } from '../../actions'

import '../../css/streams.css'
import '../../css/app.css'

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams()
    }

    renderCreateStreamButton = () => {
        if(this.props.isSignedIn) {
            return (
                <div>
                    <Link to="/streams/create">
                        <button className="btn no-icon primary">Create Stream</button>
                    </Link>
                </div>
            )
        }
    }

    renderAdmin = stream => {
        if(stream.userID === this.props.currentUserID) {
            return (
                <span className="admin-buttons">
                    <button className="btn no-icon primary">Edit</button>
                    <button className="btn no-icon danger">Delete</button>
                </span>
            )
        }
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div key={stream.id} className="stream-item">
                    <div>
                        <p className="stream-item-title">{stream.title}</p>
                        <p className="stream-item-description">{stream.description}</p>
                    </div>
                    <div>
                        {this.renderAdmin(stream)}
                    </div>
                </div>
            )
        })
    }

    render() {
        
        return ( 
            <div>
                StreamList
                <div className="container">
                {this.renderList()}
                {this.renderCreateStreamButton()}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        streams: Object.values(state.streams),
        currentUserID: state.auth.userID,
        isSignedIn: state.auth.userID
    }
} 

export default connect(mapStateToProps, {fetchStreams})(StreamList)