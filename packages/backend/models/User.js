const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 4,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) return user;
  const error = new Error('Incorrect identifiers.');
  error.statusCode = 403;
  throw error;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 12);

  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
