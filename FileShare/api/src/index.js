import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const chalk = require('chalk')
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer';

import {connect} from './database'
import AppRouter from './router'
import {smtpConfig} from './config'

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

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
const upload = multer({storage: storageConfig})


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('root', __dirname);
app.set('storageDirectory', storageDirectory)
app.set('upload', upload)
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