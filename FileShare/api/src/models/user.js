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
        this.loginUser = this.loginUser.bind(this)
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

    hashPasswordSync(password) {
        return bcrypt.hashSync(password, saltRounds)
    }

    loginUser(email, password, callback = () => {}) {
        let error = null
        let user = {email:'vjfiv', password : 'akcndocn'}
        
        if(!email || !password){
            error = {message : 'Email and password is required'}
            return callback(error, null)
        }

        this.findUserByEmailID(email, (err, user) => {
            
            // if(user && err === null){
            //     console.log('passowrd same', bcrypt.compareSync(password, user[0].password))
            //     callback(null, user)
            // }
            if(err || !user){
                error = {message : 'Error while logging in'}
                return callback(error, null)
            }

            if(user && (err === null) && bcrypt.compareSync(password, user[0].password)){
                return callback(null, user)
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