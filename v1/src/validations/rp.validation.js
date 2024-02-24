const Joi = require('joi');
const { isValidObjectId } = require('../scripts/utils/helper');
const { Sources, Charts } = require('../services/distributionCurves.service');

module.exports = {
  distributionCurves: Joi.object().keys({
    rpIdList: Joi.array()
      .min(1)
      .items(
        Joi.string()
          .required()
          .custom((value, helper) => {
            if (!isValidObjectId(value)) {
              return helper.message('Invalid rp!');
            }
            return value;
          })
      ),
    sourceList: Joi.array()
      .min(1)
      .items(Joi.string().valid(...Object.values(Sources))),
    chartList: Joi.array()
      .min(1)
      .items(Joi.string().valid(...Object.values(Charts))),
  }),
};
