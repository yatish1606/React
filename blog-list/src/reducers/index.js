import { combineReducers } from 'redux'

const songsReducer = () => {
    return [
        { name: 'Song1', duration : '3:15'},
        { name: 'Song2', duration : '3:15'},
        { name: 'Song3', duration : '3:15'},
        { name: 'Song4', duration : '3:15'},
        { name: 'Song5', duration : '3:15'},
        { name: 'Song6', duration : '3:15'},
    ]
}

const selectedSongReducer = (selectedSong = null, action) => {
    if(action.type === 'SELECTED_SONG') {
        return action.payload
    }
    return selectedSong
}

export default combineReducers({
    dummy : () => ''
})