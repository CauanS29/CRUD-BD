// server.ts
import express from 'express';
import router from './routes/user';
const body = require('body-parser'); 

import { Client } from 'pg';


const app = express();
const port = 3000;

app.use(express.json());
app.use(body.json({
  limit: '500kb'
}))
app.use(router); 


app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
 