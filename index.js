const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const helmet = require('helmet');
const {
  logError,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');
const app = express();

app.use(express.json()); //utilizar el middleware para las solicitudes json (Post,Put)
app.use(helmet());
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
app.use(morgan('combined'));

require('./utils/auth');
const port = 3000;

app.get('/', (req, res) => {
  res.send('Driver solution');
});

routerApi(app);
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Corriendo en el puerto ' + port);
});
