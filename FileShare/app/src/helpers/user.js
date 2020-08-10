import {APIURL} from '../config'
import axios from 'axios'

export const createUserAccount = (user) => {
    const URL = `${APIURL}/users`
    return axios.post(URL, user)
}

export const loginUser = (email = null, password = null) => {
    const URL = `${APIURL}/users/login`
    return axios.post(URL, {
        email,
        password
    })
}