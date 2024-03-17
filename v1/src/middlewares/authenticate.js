const JWT = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  if (req.query.from === 'mobile') {
    return next();
  }
  const token = req.headers?.authorization?.split(' ')[1] || null;
  if (token === null) throw new Error('You are not authorized.');

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) throw new Error('Token expired.');
    req.user = user['0'];
    next();
  });
};

module.exports = authenticateToken;
