import React from 'react'

const VideoDetail = props => {
    
    if(props.videoInfo) {
        return (
            <div>{props.videoInfo.snippet.title}</div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetail