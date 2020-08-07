import _ from 'lodash'
import bcrypt from 'bcrypt'

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
            console.log('Found users')
            return callback(err, user)
        })
    }

    hashPasswordSync(password) {
        return bcrypt.hashSync(password, saltRounds)
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