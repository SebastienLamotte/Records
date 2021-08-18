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
    .required('Description is required')
    .min(8, minMsg(8))
    .max(1000, maxMsg(1000)),
  start: yup
    .date()
    .required('Valid starting date and time are required.')
    .test({
      name: 'start earlier than end',
      message: 'Starting Date should be earlier than Ending Date',
      test: function (start) {
        const startTime = new Date(start).getTime();
        const endTime = new Date(this.parent.end).getTime();
        return !startTime || !endTime || startTime < endTime;
      },
    }),
  end: yup
    .date()
    .required('Valid ending date and time are required')
};
