module.exports = (error, req, res, next) => {
  res.json({
    success: false,
    error: {
      message: error.message || "Internal Server Error...",
    },
  });
};
