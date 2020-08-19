import React from 'react'

class VideoList extends React.Component {
    render() {
        return (
            <div>
                found {this.props.videos.length} videos
            </div>
        )
    }
}

export default VideoList