const { verify } = require('jsonwebtoken');

module.exports = () => {
  return async (req, res, next) => {
    const authorization = req.headers.authorization;
    try {
      const accesstoken = authorization.split(' ')[1];
      req.payload = verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      res.redirect('/auth/refresh-token');
    }
  };
};
