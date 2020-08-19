import React from 'react'
import SearchBar from './SearchBar'
import YoutubeAPI from '../api/youtube'
import VideoList from './VideoList'

class App extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            videos : []
        }
    }
    
    handleYoutubeSearch = async (searchQuery) => {
        
        const response = await YoutubeAPI.get(
            '/search',
            {params : { q : searchQuery}}
        )
        this.setState({videos : response.data.items})
        console.log(this.state.videos)
        
    }

    render() {
        return (
            <div className="ui container" style={{marginTop:'20px'}}>
                <SearchBar handleYoutubeSearch={this.handleYoutubeSearch}/>
                <VideoList videos={this.state.videos}/>
            </div>
        )
    }
}

export default App