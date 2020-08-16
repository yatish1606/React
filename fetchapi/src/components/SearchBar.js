import React from 'react';


class SearchBar extends React.Component {

    constructor(props){
        
        super(props)

        this.state = {
            searchQuery : ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange = function (event) {
        
        const value = event.target.value
        this.setState({searchQuery: value})

        
    }

    handleFormSubmit = function (event)  {
        event.preventDefault()
        this.props.onSearchQuery(this.state.searchQuery)
    }

    

    render() {
        return (
            <div className="ui segment">
                <form 
                    className="ui form"
                    onSubmit={this.handleFormSubmit}
                >
                    <div className="field">
                        <label>Image Search</label>
                        <input 
                            type="text" 
                            onChange={this.handleInputChange}
                            value={this.state.searchQuery}
                            placeholder="Enter keyword"
                        />
                    </div>          
                </form>
            </div>
        )
    }
}

export default SearchBar