const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const cors = require("cors");
const loaders = require("./loaders");
const { UserRoutes, SiteBoundsRoutes, SitesRoutes } = require("./routes");

config();
loaders();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

//* Routes
app.use("/api/users", UserRoutes);
app.use("/api/siteBounds", SiteBoundsRoutes);
app.use("/api/sites", SitesRoutes);


app.listen(process.env.APP_PORT, () => {
  console.log("SERVER RUNNING ON :" + process.env.APP_PORT);
});
