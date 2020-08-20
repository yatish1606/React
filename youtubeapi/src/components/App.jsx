import React from 'react'
import SearchBar from './SearchBar'
import YoutubeAPI from '../api/youtube'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

class App extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            videos : [],
            videoDetails : null
        }
    }
    
    handleYoutubeSearch = async (searchQuery) => {
        
        const response = await YoutubeAPI.get(
            '/search',
            {params : { q : searchQuery}}
        )
        this.setState({videos : response.data.items})
    }

    propsPassedToParentVideoDetails = videoInfo => {
        this.setState({videoDetails: videoInfo})
        console.log(videoInfo)
    }

    render() {
        return (
            <div className="ui container" style={{marginTop:'20px'}}>
                <SearchBar handleYoutubeSearch={this.handleYoutubeSearch}/>
                <VideoDetail videoInfo={this.state.videoDetails}/>
                <VideoList 
                    videos={this.state.videos}
                    propsPassedToParentVideoDetails={this.propsPassedToParentVideoDetails}
                />
            </div>
        )
    }
}

export default App