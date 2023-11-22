const ResistivityContour = require('../models/resistivityContour.model');

const insertContours = async (resistivityContourData) => {
  const resistivityContours = await ResistivityContour.insertMany(
    resistivityContourData
  );
  if (resistivityContours) return resistivityContours;
  throw new Error('ResistivityContours are not created');
};

const getBySiteId = async (siteId) => {
  const resistivityContours = await ResistivityContour.find({ siteId });
  if (resistivityContours) return resistivityContours;
  throw new Error('Resistivity contours not found');
};

module.exports = {
  insertResistivityContours: insertContours,
  getBySiteId,
};
