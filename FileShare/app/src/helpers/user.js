import {APIURL} from '../config'
import axios from 'axios'

export const createUserAccount = (user) => {
    const URL = `${APIURL}/users`
    return axios.post(URL, user)
}