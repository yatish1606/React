const chalk = require('chalk')
import path from 'path'
import {version} from '../package.json'
import _ from 'lodash'
import File from './models/file'

class AppRouter {
    constructor(app) {
        this.app = app
        this.setupRouters()
    }

    setupRouters() {

        const app = this.app
        const uploadDirectory = app.get('storageDirectory')
        const upload = app.get('upload')

        app.get('/', (req, res, next) => {
            return res.status(200).json({
                version
            })
        })

        // Upload file
        app.post('/api/upload', upload.array('files') ,(req, res, next) => {
            console.log(chalk.white('Uploaded File recieved : ', req.files))
            const files = _.get(req, 'files', [])
            let fileModels = []
            _.each(files, (fileObject) => {
                const newFile = new File(app).initWithObject(fileObject).toJSON()
                fileModels.push(newFile)
            })
            return res.json({
                files : fileModels
            })
        })

        // Download file
        app.get('/api/download/:name', (req, res, next) => {
            const fileName = req.params.name
            const filePath = path.join(uploadDirectory,fileName)
            return res.download(filePath, fileName, err => {
                if(err){
                    return res.json({
                        error:{
                            message:'File not found'
                        }
                    })
                } else {
                    console.log(chalk.green('File is successfully downloaded'))
                }
            })
        })
        
        console.log(chalk.green('App Routing is set up'))
    }
}
export default AppRouter