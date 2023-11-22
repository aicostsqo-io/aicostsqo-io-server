const GprProfile = require('../models/gprProfile.model');

const insertProfiles = async (gprProfileData) => {
  const gprProfiles = await GprProfile.insertMany(gprProfileData);
  if (gprProfiles) return gprProfiles;
  throw new Error('GprProfiles are not created');
};

const getBySiteId = async (siteId) => {
  const gprProfiles = await GprProfile.find({ siteId }).sort({
    rectangleLineNumber: 1,
  });
  if (gprProfiles) return gprProfiles;
  throw new Error('Gpr profiles not found');
};

module.exports = {
  insertGprProfiles: insertProfiles,
  getBySiteId,
};
