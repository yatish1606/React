import archiver from 'archiver'
import _ from 'lodash'
import path from 'path'
import S3 from './s3'

export default class FileArchiver {
    constructor(app, files = [], response) {
        this.app = app
        this.files = files
        this.response = response
    }

    downloadFiles() {
        const files = this.files
        //const uploadDirectory = this.app.get('storageDirectory')
        const zip = archiver('zip')
        const response = this.response
        const app = this.app

        response.attachment('download.zip')
        zip.pipe(response)

        const s3Downloader = new S3(app, response)
 
        _.each(files, file => {
            // const filePath = path.join(uploadDirectory, _.get(file, 'name'))
            // zip.file(filePath, {name :  _.get(file, 'originalName')})

            const fileObject = s3Downloader.getObject(file)
            zip.append(fileObject, {name :  _.get(file, 'originalName')})
        })

        zip.finalize()
        return this
    }
}