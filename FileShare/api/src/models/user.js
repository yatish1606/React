import _ from 'lodash'
import bcrypt from 'bcrypt'
import Auth from './auth'
import {ObjectID} from 'mongodb'

const saltRounds = 10

export default class User {
    
    constructor(app){
        this.app = app;

        this.model = {
            name : null,
            email : null,
            password : null,
            created : new Date(),
            updated : null
        }

        this.findUserByEmailID = this.findUserByEmailID.bind(this)
        this.hashPasswordSync = this.hashPasswordSync.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.findUserByID = this.findUserByID.bind(this)
    }

    initWithObject(obj) {
        this.model.name = _.trim(_.get(obj, 'name', null))
        this.model.email = _.toLower(_.trim( _.get(obj, 'email', null)))
        this.model.password = _.trim(_.get(obj, 'password', null))
    
        return this
    }

    findUserByEmailID(email = null, callback = () => {}) {

        const db = this.app.db
        db.collection('users').find({email : email}).limit(1).toArray((err, user) => {
            return callback(err, user)
        })
    }

    findUserByID(id = null, callback = () => {}) {
        
        const db = this.app.db
        db.collection('users').find({_id : new ObjectID(id)}).limit(1).toArray((err, user) => {
            if(err == null && user[0]){
                return callback(null, user[0])
            }
            const error = {message:'User not found'}
            return callback(error, null)
        })
    }

    hashPasswordSync(password) {
        return bcrypt.hashSync(password, saltRounds)
    }

    loginUser(email, password, callback = () => {}) {
        let error = null
        let user = {email:null, password : null}
        const app = this.app
        
        if(!email || !password){
            error = {message : 'Email and password is required'}
            return callback(error, null)
        }

        this.findUserByEmailID(email, (err, user) => {
            
            if(err || !user){
                error = {message : 'Error while logging in'}
                return callback(error, null)
            }

            if(user && (err === null) && bcrypt.compareSync(password, user[0].password)){
                
                new Auth(app).createNewUserToken(user[0], null, (err, token) => {
                    if(err){
                        error = {message : 'Error while logging in'}
                        return callback(error, null)
                    }
                    delete user.password
                    token.user = user
                    return callback(null, token)
                })
                             
            } else {
                error = {message : 'Incorrect password'}
                return callback(error, null)
            }


        })
    }

    validate(cb = () => {}) {
        
        let errors = []

        const model = this.model
    
        if(model.password.length <= 3){
            errors.push({message: 'Password must be longer than 3 characters.'})
        }

        this.findUserByEmailID(model.email, (error, user) => {
            console.log('Recieved from finduser', error, user)
            if(user.length || error){
                errors.push({message: 'An account with this email already exists! Try logging in.'})
            }
            return cb(errors)
        })
    }

    createUser(callback) {

        const app = this.app
        let model = this.model
        const db = app.db

        model.password = this.hashPasswordSync(model.password)

        this.validate((errors) => {

            let messages = []

            if(errors.length) {

                _.each(errors, error => {
                    messages.push(error.message)
                })

                return callback(_.join(messages, ','), null)
            }
            db.collection('users').insertOne(model, (err, result) => {
                return callback(err, model)
            })
            
        })
        
    }
}