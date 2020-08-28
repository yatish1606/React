import React from 'react'
import { connect } from 'react-redux'

class SongList extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                songs list
            </div>
        )
    }
}

export default connect() (SongList)