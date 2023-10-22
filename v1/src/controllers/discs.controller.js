const {
  listDiscs,
  getDiscsByRpId,
  insertDisc,
} = require('../services/disc.service');

const index = async (req, res) => {
  const discs = await listDiscs();
  res.send({
    success: true,
    message: discs,
  });
};

const listByRpId = async (req, res) => {
  const discs = await getDiscsByRpId(req.params.id);
  res.send({
    success: true,
    discs,
  });
};

const create = async (req, res) => {
  const disc = await insertDisc(req.body);
  res.send({
    disc,
    success: true,
    message: 'Disc created successfully',
  });
};

module.exports = {
  index,
  listByRpId,
  create,
};
