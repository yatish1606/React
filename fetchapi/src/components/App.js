import React from 'react';
import axios from 'axios'
import {UNSPLASH_AUTH_KEY} from '../config'
import SearchBar from './SearchBar'

class App extends React.Component {


    onSearchQuery = (searchQuery) => {
        let URL = 'https://api.unsplash.com/search/photos'
        axios.get(URL, {
            params : {query : searchQuery},
            headers : {
                Authorization: UNSPLASH_AUTH_KEY
            }
        }).then(response => console.log(response))
    }

    render() {
        return (
            <div className="ui container" style={{marginTop:'20px'}}>
                <SearchBar
                    onSearchQuery={this.onSearchQuery}
                />
            </div>
        )
    }
    
}

export default App