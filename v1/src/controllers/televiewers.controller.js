const {
  getBySiteId: getTeleviewers,
} = require('../services/televiewer.service');
const { getBySiteId: getDiscs } = require('../services/televiewerDisc.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const televiewers = await getTeleviewers(siteId);
  const televiewerDiscs = await getDiscs(siteId);
  const result = {
    televiewers,
    televiewerDiscs,
  };
  res.send({
    result,
    success: true,
    message: 'Televiewers listed successfully',
  });
};

module.exports = {
  getBySiteId,
};
