import axios from 'axios'
import {UNSPLASH_AUTH_KEY} from '../config'

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: UNSPLASH_AUTH_KEY
    }
})