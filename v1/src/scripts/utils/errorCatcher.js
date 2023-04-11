const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch((err) => next(err));
};

const handler = (handler) => (req, res, next) => {
  try {
    handler(req, res);
  } catch (e) {
    next(e);
  }
};
module.exports = (fn) =>
  fn.constructor.name === "AsyncFunction" ? asyncHandler(fn) : handler(fn);
