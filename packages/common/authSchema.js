const yup = require('yup');
const { minMsg, maxMsg } = require('./utils/functions');

const loginObject = {
  username: yup
    .string()
    .required('Username is required.')
    .min(4, minMsg(4))
    .max(20, maxMsg(20)),
  password: yup.string().required('Password is required.').min(8, minMsg(8)),
};

const signupObject = {
  ...loginObject,
  email: yup
    .string()
    .required('Email is required.')
    .email('Email must be a valid email.'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required.')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
};

module.exports = {
  login: yup.object(loginObject),
  signup: yup.object(signupObject),
};
