const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeRecordSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000,
  },
  start: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const TimeRecord = mongoose.model('timeRecord', timeRecordSchema);
module.exports = TimeRecord;
