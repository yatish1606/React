import React from 'react'

const VideoDetail = props => {
    
    if(props.videoInfo) {

        const videoSource = `https://www.youtube.com/embed/${props.videoInfo.id.videoId}`

        return (
            <div>
                <div className="ui embed">
                    <iframe title="video player" src={videoSource}></iframe>
                </div>
                <div className="ui segment">
                    <h4 className="ui header">{props.videoInfo.snippet.title}</h4>
                    <p>{props.videoInfo.snippet.description}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetail