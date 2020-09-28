import express from 'express';
import { router } from './router/router';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router);

export {app};