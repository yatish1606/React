import React from 'react'
import axios from 'axios'

const Search = () => {

    const [searchQuery, setSearchQuery] = React.useState('')
    const [results, setResults] = React.useState([])

    const handleSearchQueryChange = event => setSearchQuery(event.target.value)

    const makeWikiAPIRequest = async (searchQuery = '') => {

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
        if(searchQuery) {
            makeWikiAPIRequest(searchQuery)
        }  
    }, [searchQuery])

    const renderedItems = results.map(item => {
        return (
            <div className="item" key={item.pageid}>
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`https:\\en.wikipedia.org?curid=${item.pageid}`}
                    >Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {item.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html : item.snippet}}></span>
                </div>
            </div>
        )
    })

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
            </div>
            <div className="ui celled list">
                {renderedItems}
            </div>
        </div>
    )
}

export default Search