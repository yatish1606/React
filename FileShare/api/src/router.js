const chalk = require('chalk')
import path from 'path'
import {version} from '../package.json'
import _ from 'lodash'
import File from './models/file'
import {ObjectID} from 'mongodb'
import Post from './models/post'
import FileArchiver from './archiver'
import Email from './email'
import S3 from './s3'
import User from './models/user.js'
import Auth from './models/auth.js'

class AppRouter {
    constructor(app) {
        this.app = app
        this.setupRouters()
    }

    setupRouters() {

        const app = this.app
        const db = app.get('db')
        const uploadDirectory = app.get('storageDirectory')
        const upload = app.upload

        app.get('/', (req, res, next) => {
            return res.status(200).json({
                version
            })
        })

        // Upload file
        app.post('/api/upload', upload.array('files') ,(req, res, next) => {

            console.log(chalk.white('Uploaded File recieved : ', req.files))

            const files = _.get(req, 'files', [])
            console.log('files from s3 bucket', files)
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
                    
                    let post = new Post(app).initWithObject({
                        from: _.get(req, 'body.from'),
                        to : _.get(req, 'body.to'),
                        message: _.get(req, 'body.message'),
                        files : result.insertedIds
                    }).toJSON()

                    db.collection('posts').insertOne(post, (err, result) => {
                        if(err){
                            return res.status(503).json({ message: 'Unable to save post'})
                        }

                        // Send email to reciever of files

                        const sendEmail = new Email(app).sendDownloadLink(post, (err, info) => {
                            if(err) {
                                console.log('Error sending email', err)
                            } else {
                                console.log('Sent email', info)
                            }
                        })

                        return res.json(post)
                    })

                })
            } else {
                return res.status(503).json({ error: 'File upload is required'})
            }
        })

        // Download individual file
        app.get('/api/download/:id', (req, res, next) => {

            const fileID = req.params.id

            db.collection('files').find({ _id: ObjectID(fileID) }).toArray((err, result) => {

                console.log(chalk.white('Searching for file', err, result))
                
                const fileName = _.get(result, '[0].name')

                if(err || !fileName){
                    return res.status(404).json({ error : {message:'File not found'}})
                }
                const file = _.get(result, '[0]')
                const downloader = new S3(app, res)
                
                //return downloader.downloadFile(file)

                const downloadURL = downloader.getDownloadURL(file)
                return res.redirect(downloadURL)

                // const filePath = path.join(uploadDirectory,fileName)

                // return res.download(filePath, _.get(result, '[0].originalName'), err => {
                //     if(err){
                //         return res.json({
                //             error:{
                //                 message:'File not found'
                //             }
                //         })
                //     } else {
                //         console.log(chalk.green('File is successfully downloaded'))
                //     }
                // })
            }) 
        })

        // View post by ID
        app.get('/api/posts/:id', (req, res, next) => {
            const postID = _.get(req, 'params.id')
            
            this._getPostByID(postID, (err, result) => {
                if(err){
                    return res.status(404).json({error : {message : 'File not found'}})
                }
                return res.json(result)
            })
        })

        // Donwload all files from a single post
        app.get('/api/posts/:id/download', (req, res, next) => {
            const postID = req.params.id

            this._getPostByID(postID, (err, result) => {
                if(err) { 
                    return res.status(404).json({error : {message : 'File not found'}})
                }
                const archiver = new FileArchiver(app, _.get(result, 'files', []), res).downloadFiles()
                return archiver
            })
        })

        app.post('/api/users', (req, res, next) => {

            const body = _.get(req, 'body')

            const user = new User(app)
                .initWithObject(body)
                .createUser((err, newUser) => {
                    console.log('Creating new user with', err, newUser)
                    if(err){
                        return res.status(503).json({
                            error: {message: err}
                        })
                    }
                    return res.status(200).json(newUser)
                })
        })

        app.post('/api/users/login', (req, res) => {
            const body = _.get(req, 'body')
            
            new User(app).loginUser(body.email, body.password, (err, token) => {
                console.log(err, token)
                if(err){
                    return res.status(401).json({ error : {message : 'Error in logging in'}})
                }
                return res.status(200).json(token)
            })  
        })

        app.get('/api/users/:id', (req, res, next) => {
            const userID = req.params.id

            new Auth(app).checkUserAuthenticationStatus(req, (isLoggedIn) => {
                if(!isLoggedIn) {
                    return res.status(401).json({error: {message:'Unauthorized login'}})
                }

                new User(app).findUserByID(userID, (err, user) => {
                    if(err){
                        return res.status(404).json({error : {message : 'User not found'}})
                    }
                    delete user.password
                    return res.status(200).json(user)
                })
                
                
            })


        })
        
        console.log(chalk.green('App Routing is set up'))
    }

    _getPostByID = (id, callback = () => {}) => {
    
        let postObjectID = null

        const db = this.app.get('db')

        try {
            postObjectID = new ObjectID(id)
        }
        catch (error) { 
            return callback(error, null)
        }

        db.collection('posts').find({_id : postObjectID}).limit(1).toArray((err, results) => {
            
            let result = _.get(results, '[0]')
            if(err || !result){
                return callback(err ? err : new Error('File not found')) 
            }
            
            // here result.files is an array of file IDs
            const fileIDs = _.get(result, 'files', [])

            const fileIDArray = Object.values(fileIDs)
            // get files from file IDs
            db.collection('files').find({_id : {$in : fileIDArray}}).toArray((err, files) => {
                // $in will select all records in 'files' collection which have their ID in fileIDs
                if(!files || err || !files.length){
                    return callback(err ? err : new Error('File not found')) 
                }
                result.files = files

                return callback(null, result)
            })
            
        })
    }
}
export default AppRouter