const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
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
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    totalDuration: {
      type: Number,
      trim: true,
    },
    timeRecords: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
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
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model('project', projectSchema);
module.exports = Project;
