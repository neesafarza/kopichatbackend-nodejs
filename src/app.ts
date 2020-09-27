import express from 'express';
import { router } from './router/router';


const app = express();
app.use(router);
app.get('/', (req,res) => res.send('Express + TypeScript Server'));

export {app};