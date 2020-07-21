import axios from 'axios'
import {APIURL} from '../config'
import _ from 'lodash'

export const upload = (form, callback = () => {}) => {
    
    const url = `${APIURL}/upload`
    let data = new FormData()

    let files = _.get(form, 'files')

    _.each(files, (file) => {
        data.append('files', file)
    })

    data.append('to', _.get(form, 'to'))
    data.append('from', _.get(form, 'from'))
    data.append('message', _.get(form, 'message'))

    const config = {
        onUploadProgress: (event) => {
            console.log('Upload prgoress', event)
            return callback({
                type: 'onUploadProgress',
                payload: event
            })
        }
    }

    axios.post(url, data, config)
        .then(response => {
            return callback({
                type:'success',
                payload: response.data
            })
        })
        .catch(err => {
            return callback({
                type:'failure',
                payload: err
            })
        })
}