const { listDiscs, getDiscsByRpId } = require('../services/disc.service');

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
    message: discs,
  });
};

module.exports = {
  index,
  listByRpId,
};
