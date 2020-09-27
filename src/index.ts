import express from 'express';
import { router } from './router/router';


const app = express();
const PORT = 8000;
app.use(router);
app.get('/', (req,res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export {app};