const yup = require('yup');
const { minMsg, maxMsg } = require('./utils/functions');

module.exports = {
  title: yup
    .string()
    .required('Title is required.')
    .min(4, minMsg(4))
    .max(30, maxMsg(30)),
  description: yup
    .string()
    .required('Description is required.')
    .min(8, minMsg(8))
    .max(1000, maxMsg(1000)),
};
