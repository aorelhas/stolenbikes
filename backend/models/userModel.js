const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },

    google: String,
    facebook: String,

    profile: {
      name: String,
      image: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
