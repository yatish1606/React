import React from 'react'

class SearchBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            searchQuery : ''
        }
    }

    handleSearchQuery = event => {
        this.setState({searchQuery : event.target.value})
    }

    handleFormSubmit = event => {
        event.preventDefault()
        console.log(this.state.searchQuery)
        // callback from parent prop
    }

    render() {
        return (
            <div className="searh-bar ui segment">
                <form 
                    className="ui form"
                    onSubmit={this.handleFormSubmit}
                >
                    <div className="field">
                        <label>Video Search</label>
                        <input 
                            type="text"
                            onChange={this.handleSearchQuery}
                        />
                    </div>                
                </form>
            </div>
        )
    }
}

export default SearchBar