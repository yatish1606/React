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
        this.setState({
            videos : response.data.items.slice(1,6), 
            videoDetails: response.data.items[0]
        })
    }

    propsPassedToParentVideoDetails = videoInfo => {
        this.setState({videoDetails: videoInfo})
        console.log(videoInfo)
    }

    render() {
        return (
            <div className="ui container" style={{marginTop:'20px'}}>
                <SearchBar handleYoutubeSearch={this.handleYoutubeSearch}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail videoInfo={this.state.videoDetails}/>
                        </div>
                        <div className="five wide column">
                            <VideoList 
                                videos={this.state.videos}
                                propsPassedToParentVideoDetails={this.propsPassedToParentVideoDetails}
                            />
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default App