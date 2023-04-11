const { list, insert } = require("../services/site.service");

const create = async (req, res) => {
  const site = await insert(req.body);
  res.send({
    site,
    success: true,
    message: "Site created successfully",
  });
};

const index = async (req, res) => {
  const sites = await list();
  res.send({
    sites,
    success: true,
    message: "Sites listed successfully",
  });
};

module.exports = {
  create,
  index,
};
