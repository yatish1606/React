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
        this.props.fetchStream(this.props.match.params.id)
        this.buildVideoPlayer()
    }

    componentDidUpdate() {
        this.buildVideoPlayer()
    }

    componentWillUnmount() {
        this.videoPlayer.destroy()
    }

    buildVideoPlayer = () => {

        if(this.videoPlayer || !this.props.stream) return 

        let { id } = this.props.match.params
        
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