import React from 'react'
import axios from 'axios'

const Search = () => {

    const [searchQuery, setSearchQuery] = React.useState('')
    const [results, setResults] = React.useState([])

    const handleSearchQueryChange = event => setSearchQuery(event.target.value)

    const makeWikiAPIRequest = async (searchQuery = 'wikipedia') => {

        const url = 'https://en.wikipedia.org/w/api.php'

        const APIResponse = await axios.get(url, {
            params: {
                action: 'query',
                list: 'search',
                origin: '*',
                format: 'json',
                srsearch: searchQuery
            }
        })
        setResults(APIResponse.data.query.search)
    }

    React.useEffect(() => {
        
        makeWikiAPIRequest()
            .then(response => console.log(response))
            .catch(error => console.log(error))
        
    }, [searchQuery])

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter search query</label>
                    <input 
                        value={searchQuery}
                        className="input"
                        onChange={handleSearchQueryChange}
                    />
                </div>
                Hello
            </div>
        </div>
    )
}

export default Search