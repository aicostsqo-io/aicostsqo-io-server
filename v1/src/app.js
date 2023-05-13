const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const cors = require("cors");
const loaders = require("./loaders");
const {
  UserRoutes,
  SiteBoundsRoutes,
  SitesRoutes,
  RpsRoutes,
} = require("./routes");
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
  app.use("/api/users", UserRoutes);
  app.use("/api/siteBounds", SiteBoundsRoutes);
  app.use("/api/sites", SitesRoutes);
  app.use("/api/rps", RpsRoutes);
  app.use(notFound);
  app.use(errorHandler);
});
