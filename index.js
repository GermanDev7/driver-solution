const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {config}= require('./config/config')
const app = express();

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

//require('./utils/auth');

const port = 3000||config.port;

app.get('/', (req, re) => {
  res.send('Hola nueva app');
});

//router

routerApi(app);
//middlewares

app.listen(port, () => {
  console.log('Corriendo en el puerto', port);
});
