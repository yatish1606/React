import _ from 'lodash'
import {S3BucketName} from './config'

export default class S3 {
    constructor(app, response) {
        this.app = app;
        this.response = response;
    }

    getObject = (file) => {
        const s3 = this.app.s3
        const options = {
            Bucket: S3BucketName,
            Key : _.get(file, 'name'),
        }
        return s3.getObject(options).createReadStream()
    }

    downloadFile = (file) => {
        const s3 = this.app.s3
        const response = this.response

        const fileName = _.get(file, 'originalName')
        response.attachment(fileName)

        const options = {
            Bucket: S3BucketName,
            Key : _.get(file, 'name'),
        }
        const fileObject = s3.getObject(options).createReadStream()

        fileObject.pipe(response)
    }

    getDownloadURL = (file) => {
        const s3 = this.app.s3
        const options = {
            Bucket: S3BucketName,
            Key : _.get(file, 'name'),
            Expires : 3600,
        }

        return s3.getSignedUrl('getObject', options)
    }
}