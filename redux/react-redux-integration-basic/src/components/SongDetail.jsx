import React from 'react'
import { connect } from 'react-redux'

const SongDetail = ({song}) => {
    
    return song ? (
        <div>
            <h3>Selected Song</h3>
            <p>
                Song : {song.name}
                <br/>
                Duration : {song.duration}
            </p>
        </div>
    ) : null
}

const mapStateToProps = state => {
    return { song : state.selectedSong}
}

export default connect(mapStateToProps)(SongDetail)