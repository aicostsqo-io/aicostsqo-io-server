const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const cors = require("cors");
const loaders = require("./loaders");

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

config();
loaders();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
  console.log("SERVER RUNNING ON :" + process.env.APP_PORT);
  app.use("/api",require('./routes'));
  app.use(notFound);
  app.use(errorHandler);
});
