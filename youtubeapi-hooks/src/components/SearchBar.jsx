import React, {useState} from 'react'

const SearchBar = props => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchQuery = event => {
        setSearchQuery(event.target.value)
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        props.handleYoutubeSearch(searchQuery)
    }

    return (
        <div className="searh-bar ui segment">
            <form 
                className="ui form"
                onSubmit={handleFormSubmit}
            >
                <div className="field">
                    <label>Video Search</label>
                    <input 
                        type="text"
                        onChange={handleSearchQuery}
                    />
                </div>                
            </form>
        </div>
    )

}

export default SearchBar