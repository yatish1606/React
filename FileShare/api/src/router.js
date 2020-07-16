const chalk = require('chalk')
import path from 'path'
import {version} from '../package.json'
import _ from 'lodash'
import File from './models/file'
import {ObjectID} from 'mongodb'

class AppRouter {
    constructor(app) {
        this.app = app
        this.setupRouters()
    }

    setupRouters() {

        const app = this.app
        const db = app.get('db')
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

            if(fileModels.length){
                db.collection('files').insertMany(fileModels, (err,result) => {
                    if(err){
                        return res.status(503).json({ message: 'Unable to upload file'})
                    }
                    return res.json({
                        file: fileModels
                    })
                })
            } else {
                return res.status(503).json({ error: 'File upload is required'})
            }
        })

        // Download file
        app.get('/api/download/:id', (req, res, next) => {

            const fileID = req.params.id

            db.collection('files').find({ _id: ObjectID(fileID) }).toArray((err, result) => {

                console.log(chalk.white('Searching for file', err, result))

                if(err || !result){
                    return res.status(404).json({ error : {message:'File not found'}})
                }

                const fileName = _.get(result, '[0].name')
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
        })
        
        console.log(chalk.green('App Routing is set up'))
    }
}
export default AppRouter