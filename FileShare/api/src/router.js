const chalk = require('chalk')
import path from 'path';
import {version} from '../package.json'

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
            const files = req.files
            return res.json({
                files
            })
        })

        // Download file
        app.get('/api/download/:name', (req, res, next) => {
            const fileName = req.params.name
            const filePath = path.join(uploadDirectory,fileName)
            res.json({
                hi:fileName
            })
        })
        
        console.log(chalk.green('App Routing is set up'))
    }
}
export default AppRouter