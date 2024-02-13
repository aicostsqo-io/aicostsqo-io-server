const {
  listRps,
  bulkDeleteRps,
  insertRp,
  getRpsBySiteBoundId,
  bulkInsertRps,
  getLastRpBySiteBoundId,
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
  const newRPs = [];
  if (req?.body[0]?.siteBound === undefined) {
    res.send({
      success: false,
      message: 'Site Bound ID is required',
    });
  }
  for (let rp of req.body) {
    const { name } = await getLastRpBySiteBoundId(rp.siteBound);
    const lastRPNumber = parseInt(name.split(' ')[1]);
    rp.name = `RP ${lastRPNumber + 1}`;
    newRPs.push(rp);
  }

  await bulkInsertRps(newRPs);
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
