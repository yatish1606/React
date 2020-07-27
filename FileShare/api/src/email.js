import _ from 'lodash'
import {URL} from './config'

export default class Email {
    constructor(app) {
        this.app = app
    }

    sendDownloadLink(post, callback = () => {}) {
        const email = this.app.email

        const from = _.get(post, 'from')
        const to = _.get(post, 'to')
        const message = _.get(post, 'message', '')
        const postID = _.get(post, '_id')
        const downloadLink = `${URL}/share/${postID}`

        let messageOptions = {
            from: from,
            to: to,
            subject: 'FileShare download invitation',
            text: message, 
            html: <p>{from} has shared some files with you. Click <a href="{${downloadLink}">here</a> to download</p>
        }

        email.sendMail(messageOptions, (err, info) => callback(err, info))
    }
}