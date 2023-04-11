const httpStatus = require("http-status");

module.exports = (error, req, res, next) => {
  res.status(httpStatus.OK).json({
    success: false,
    error: {
      message: error.message || "Internal Server Error...",
    },
  });
};
