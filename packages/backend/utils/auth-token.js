const { sign } = require('jsonwebtoken');

const createAccessToken = (user) => {
  return sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (user) => {
  return sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

const setTokens = (res, user) => {
  res.cookie(process.env.REFRESH_TOKEN_NAME, createRefreshToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return createAccessToken(user);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  setTokens,
};
