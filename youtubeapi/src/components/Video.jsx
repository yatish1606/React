import React from 'react'
import './Video.css'

const Video = props => {
    return (
        <div 
            className="video-item item"
            onClick={props.propsPassedToParentVideoDetails(props.videoInfo)}
        >
            <img
                className="ui image" 
                src={props.videoInfo.snippet.thumbnails.medium.url}
            />
            <div className="content">
                <div className="header">
                    {props.videoInfo.snippet.title}
                </div>
            </div>       
        </div>
    )
}

export default Video