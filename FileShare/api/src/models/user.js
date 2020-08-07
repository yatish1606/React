import _ from 'lodash'

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
    }

    initWithObject(obj) {
        this.model.name = _.trim(_.get(obj, 'name', null))
        this.model.email = _.toLower(_.trim( _.get(obj, 'email', null)))
        this.model.password = _.trim(_.get(obj, 'password', null))
    
        return this
    }

    createUser(callback) {

        const app = this.app
        const model = this.model
        const db = app.db

        db.collection('users').insertOne(model, (err, result) => {
            return callback(err, model)
        })
    }
}