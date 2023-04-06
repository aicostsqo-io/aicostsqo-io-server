const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const cors = require("cors");
const loaders = require("./loaders");
const { UserRoutes } = require("./routes");

config();
loaders();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

//* Routes
app.use("/api/users", UserRoutes);


app.listen(process.env.APP_PORT, () => {
  console.log("SERVER RUNNING ON :" + process.env.APP_PORT);
});
