export default class Auth {
    constructor(app){
        this.app = app;

        this.model = {
            expire : null,
            userID : null,
        }

        this.createNewUserToken = this.createNewUserToken.bind(this)
    }

    createNewUserToken(user, expires = null, callback = () => {}){
        const db = this.app.db
        let model = this.model

        model.expire = expires
        model.userID = user._id

        db.collection('tokens').insertOne(model, (err, token) => {
            return callback(err, token)
        })
    }
}