module.exports = (req, res, next) => {
  next(new Error("Not found"));
};
