const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the headers
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'there is no Token,authorization denied' });
  }

  //verify token if there is one
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token not valid' });
  }
};
