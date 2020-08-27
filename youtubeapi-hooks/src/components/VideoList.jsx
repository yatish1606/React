import React from 'react'
import Video from './Video'

class VideoList extends React.Component {

    render() {

        const renderedList = this.props.videos.map( (video,index) => {
            return (
                <Video 
                    videoInfo={video}
                    key={index}
                    propsPassedToParentVideoDetails={this.props.propsPassedToParentVideoDetails}
                />
            )
        })

        return (
            <div className="ui relaxed divided list">
                {renderedList}
            </div>
        )
    }
}

export default VideoList