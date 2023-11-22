const GprProfile = require('../models/gprProfile.model');

const insert = async (gprProfileData) => {
  const gprProfile = await GprProfile.create(gprProfileData);
  if (gprProfile) return gprProfile;
  throw new Error('GprProfile is not created');
};

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
  insert,
};
