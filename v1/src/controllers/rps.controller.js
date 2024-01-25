const {
  listRps,
  bulkDeleteRps,
  insertRp,
  getRpsBySiteBoundId,
  bulkInsertRps,
} = require('../services/rp.service');

const create = async (req, res) => {
  const rp = await insertRp(req.body);
  res.send({
    rp,
    success: true,
    message: 'Rp created successfully',
  });
};

const bulkDelete = async (req, res) => {
  await bulkDeleteRps(req.body);
  res.send({
    success: true,
    message: 'Deleted successfully',
  });
};

const bulkInsert = async (req, res) => {
  await bulkInsertRps(req.body);
  res.send({
    success: true,
    message: 'Created successfully',
  });
};

const index = async (req, res) => {
  const rps = await listRps();
  res.send({
    rps,
    success: true,
    message: 'Rps listed successfully',
  });
};

const getBySiteBoundId = async (req, res) => {
  const { siteBoundId } = req.params;
  const rps = await getRpsBySiteBoundId(siteBoundId);
  res.send({
    rps,
    success: true,
    message: 'Rps listed successfully',
  });
};

module.exports = {
  bulkDelete,
  index,
  create,
  getBySiteBoundId,
  bulkInsert,
};
