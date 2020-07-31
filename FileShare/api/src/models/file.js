import _ from 'lodash'

class File {
    constructor(app, object){
        this.app = app;

        this.model = {
            name : null,
            originalName : null,
            mimeType : null,
            size : null,
            created : Date.now(),
            etag : null
        }
    }

    initWithObject(object){
        this.model.name = _.get(object,'key')
        this.model.originalName = _.get(object,'originalname')
        this.model.mimeType = _.get(object,'mimetype')
        this.model.size = _.get(object,'size')
        this.model.created = Date.now()
        this.model.etag = _.get(object,'etag')
        return this
    }

    toJSON(){
        return this.model
    }

    save(callback){
        const db = this.app.get('db')

        db.collection('files').insertOne(this.model, (err,result) => {
            return callback(err,result)
        })
    }
}

export default File