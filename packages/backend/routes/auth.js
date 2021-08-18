const express = require('express');
const router = express.Router();

const { authSchema } = require('@records/common');

const validate = require('../middleware/validate');
const isAuth = require('../middleware/isAuth');

const authController = require('../controllers/auth');

router.post('/signup', validate(authSchema.signup), authController.signup);

router.post('/login', validate(authSchema.login), authController.login);

router.post('/logout', authController.logout);

router.use('/refresh-token', authController.refreshToken);

router.get(
  '/list-potential-participants',
  isAuth(),
  authController.getPotentialParticipants
);

module.exports = router;
