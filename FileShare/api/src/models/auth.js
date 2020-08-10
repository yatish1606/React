import {ObjectID} from 'mongodb'

export default class Auth {
    constructor(app){
        this.app = app;

        this.model = {
            expire : null,
            userID : null,
        }

        this.createNewUserToken = this.createNewUserToken.bind(this)
        this.checkUserAuthenticationStatus = this.checkUserAuthenticationStatus.bind(this)
    }

    createNewUserToken(user, expires = null, callback = () => {}){
        const db = this.app.db
        let model = this.model

        model.expire = expires
        model.userID = user._id

        db.collection('tokens').insertOne(model, (err, token) => {
            return callback(err, model)
        })
    }

    checkUserAuthenticationStatus(req, callback = () => {}) {
        const token = req.get('authorization')
       
        if(!token){
            return callback(false)
        }

        const db = this.app.db
        db.collection('tokens').find({userID : new ObjectID(token)}).limit(1).toArray((err, tokenObject) => {
            
            if(err === null && tokenObject[0]){
                return callback(true)
            }
            callback(false)
        })
        
    }
}