const express = require('express');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const config = require('./config');
const cors = require('cors');
const loaders = require('./loaders');
const path = require('path');

const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

config();
loaders();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

app.listen(process.env.APP_PORT, () => {
  console.log('SERVER RUNNING ON :' + process.env.APP_PORT);
  app.use('/api/test', (req, res) => {
    res.send('Hello World');
  });
  app.use('/api', require('./routes'));
  app.use(notFound);
  app.use(errorHandler);
});
