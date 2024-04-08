// server.ts
import express from 'express';
import router from './routes';
const body = require('body-parser'); 



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
 