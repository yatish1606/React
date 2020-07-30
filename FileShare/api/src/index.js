import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const chalk = require('chalk')
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import nodemailer from 'nodemailer';

import {connect} from './database'
import AppRouter from './router'
import {smtpConfig, AWSS3Config, S3Region, S3BucketName} from './config'
import AWS from 'aws-sdk'

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

AWS.config.update(AWSS3Config)
AWS.config.region = S3Region

const s3 = AWS.S3()

let email = nodemailer.createTransport(smtpConfig)

const storageDirectory = path.join(__dirname, '..' , 'storage')
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storageDirectory)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
})
//const upload = multer({storage: storageConfig})
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: S3BucketName,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
})


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('root', __dirname);
app.set('storageDirectory', storageDirectory)
app.upload = upload
app.email = email

connect( (err,db) => {

    if(err) {
        console.log(chalk.red('There was an error connecting to the database'))
        // throw err
    }  

    app.set('db',db)
    new AppRouter(app);

    app.server.listen(process.env.PORT || PORT, () => {
        console.log(chalk.green(`App is running on port ${app.server.address().port}`));
    });

})

export default app;