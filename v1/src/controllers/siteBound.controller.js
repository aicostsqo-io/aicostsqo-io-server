const { insert, list } = require("../services/siteBound.service");

const create = async (req, res) => {
  const siteBound = await insert(req.body);
  res.send({
    siteBound,
    success: true,
    message: "SiteBound created successfully",
  });
};

const index = async (req, res) => {
  const siteBounds = await list();
  res.send({
    siteBounds,
    success: true,
    message: "SiteBounds listed successfully",
  });
};

module.exports = {
  create,
  index,
};
