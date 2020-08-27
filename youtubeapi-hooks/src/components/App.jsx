import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'
import useVideoSearch from '../hooks/useVideoSearch'

const App = () => {

    const [videoDetails, setVideoDetails] = useState(null)
    const [videos, handleYoutubeSearch] = useVideoSearch('nature scenery')
    
    useEffect(() => {
        setVideoDetails(videos[0])
    }, [videos])

    return (
        <div className="ui container" style={{marginTop:'20px'}}>
            <SearchBar handleYoutubeSearch={handleYoutubeSearch}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail videoInfo={videoDetails}/>
                    </div>
                    <div className="five wide column">
                        <VideoList 
                            videos={videos}
                            propsPassedToParentVideoDetails={(videoInfo) => setVideoDetails(videoInfo)}
                        />
                    </div>
                </div>
            </div>    
        </div>
    )

}

export default App