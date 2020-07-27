import archiver from 'archiver'
import _ from 'lodash'
import path from 'path'

export default class FileArchiver {
    constructor(app, files = [], response) {
        this.app = app
        this.files = files
        this.response = response
    }

    downloadFiles() {
        const files = this.files
        const uploadDirectory = this.app.get('storageDirectory')
        const zip = archiver('zip')
        const response = this.response

        response.attachment('download.zip')
        zip.pipe(response)
 
        _.each(files, file => {
            const filePath = path.join(uploadDirectory, _.get(file, 'name'))
            zip.file(filePath, {name :  _.get(file, 'originalName')})
        })

        zip.finalize()
        return this
    }
}