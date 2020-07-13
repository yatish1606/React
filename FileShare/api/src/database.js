const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk')

const url = 'mongodb://localhost:27017';
const dbName = 'FileShare';

export const connect = callback => {
    MongoClient.connect(url, {useUnifiedTopology : true}, 
    (err, client) => {
        console.log(chalk.bgGreen.black(" Connected successfully to server "));
    
        const db = client.db(dbName);
        return callback(err,db)
    });
}

