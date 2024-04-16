const {
  insert,
  getByRpId: getDFNsByRpId,
  getById: getDFNById,
} = require('../services/dfn.service');

const getByRpId = async (req, res) => {
  const { rpId } = req.params;
  const dfns = await getDFNsByRpId(rpId);
  res.send({
    dfns,
    success: true,
    message: 'DFNs listed successfully',
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const dfn = await getDFNById(id);
  res.send({
    dfn,
    success: true,
    message: 'DFN fetched successfully',
  });
};

const create = async (req, res) => {
  const dfn = await insert(req.body);
  res.send({
    dfn,
    success: true,
    message: 'DFN created successfully',
  });
};

module.exports = {
  create,
  getByRpId,
  getById,
};
