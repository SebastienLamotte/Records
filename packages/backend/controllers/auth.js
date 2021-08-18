const User = require('../models/User');
const { setTokens } = require('../utils/auth-token');
const { verify } = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await new User({ username, email, password }).save();
    res.status(201).json({ success: 'User successfully created.' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const accessToken = setTokens(res, user);
    res.status(200).json({ accessToken, userId: user._id, username });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie(process.env.REFRESH_TOKEN_NAME, { httpOnly: true });
  res.status(200).json({ success: 'User successfully logout' });
};

exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];
  let payload;
  try {
    payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized.' });
  }
  try {
    const user = await User.findOne({ _id: payload.userId });
    if (!user) return res.status(401).json({ error: 'Not authorized.' });

    const accessToken = setTokens(res, user);
    res.status(200).json({ accessToken, userId: user._id, username: user.username });
  } catch (err) {
    next(err);
  }
};

exports.getPotentialParticipants = async (req, res, next) => {
  const ids = req.query.exclude.split(',');
  try {
    const users = await User.find({ _id: { $nin: ids } }, 'username');
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
