import axios from 'axios'
import _ from 'lodash'
import {APIURL} from '../config'

export const getDownloadInformation = id => {

    const url = `${APIURL}/posts/${id}`
    return axios.get(url)
}