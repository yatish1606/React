import React from 'react'
import { fetchStream } from '../../actions'
import { connect } from 'react-redux'
import FLV from 'flv.js'

import LoadingModal from '../commons/LoadingModal'

class StreamShow extends React.Component {

    constructor(props) {
        super(props)

        this.videoReference = React.createRef()
    }
    
    componentDidMount() {
        let { id } = this.props.match.params
        this.props.fetchStream(id)
        this.videoPlayer = FLV.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.videoPlayer.attachMediaElement(this.videoReference.current)
        this.videoPlayer.load()
    }
    
    render() {
        console.log(this.props)
        return this.props.stream ? (
            <div className="container">
                <div className="video-player">
                    <video
                        ref={this.videoReference}
                        controls
                        style={{width:'80%', borderRadius: 5, overflow:'hidden'}}
                    />
                </div>
                <div>
                    StreamShow {this.props.stream.id}
                </div>
                
            </div>
        ) : <LoadingModal/>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream : state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow)