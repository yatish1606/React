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
        }
    }

    initWithObject(object){
        this.model.name = _.get(object,'name')
        this.model.originalName = _.get(object,'originalName')
        this.model.mimeType = _.get(object,'mimeType')
        this.model.size = _.get(object,'size')
        this.model.created = Date.now()
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