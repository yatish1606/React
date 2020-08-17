import React from 'react';
import axiosClient from '../api/unsplash'
import SearchBar from './SearchBar'
import ImageList from './ImageList'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            imagesData : []
        }
    }

    onSearchQuery = async (searchQuery) => {

        let URL = '/search/photos'

        const response = await axiosClient.get(URL, {
            params : {query : searchQuery},
        })
        
        this.setState({imagesData: response.data.results})
        this.forceUpdate()
        
    }

    render() {
        return (
            <div className="ui container" style={{marginTop:'20px'}}>
                <SearchBar
                    onSearchQuery={this.onSearchQuery}
                />
                <ImageList images={this.state.imagesData}/>
            </div>
        )
    }
    
}

export default App