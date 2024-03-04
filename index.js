const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logError,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');
const app = express();

app.use(express.json()); //utilizar el middleware para las solicitudes json (Post,Put)

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

require('./utils/auth');
const port = 3000;

app.get('/', checkApiKey, (req, res) => {
  res.send('Hello word');
});



routerApi(app);
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Corriendo en el puerto ' + port);
});
