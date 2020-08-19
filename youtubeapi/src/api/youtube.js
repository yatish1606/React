import axios from 'axios'
import {YOUTUBE_API_KEY} from './config'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params : {
        part : 'snippet',
        maxResults : 5,
        key : YOUTUBE_API_KEY,
        type : 'video'
    }
})