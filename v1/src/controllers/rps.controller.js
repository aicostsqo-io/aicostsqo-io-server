const { list, bulkDeleteRps, insert } = require("../services/rp.service");

const create = async (req, res) => {
  const rp = await insert(req.body);
  res.send({
    rp,
    success: true,
    message: "Rp created successfully",
  });
};

const bulkDelete = async (req, res) => {
  await bulkDeleteRps(req.body);
  res.send({
    success: true,
    message: "Deleted successfully",
  });
};

const index = async (req, res) => {
  const rps = await list();
  res.send({
    rps,
    success: true,
    message: "Rps listed successfully",
  });
};

module.exports = {
  bulkDelete,
  index,
  create,
};
