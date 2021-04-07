const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },

    googleID: { type: String },
    facebookID: { type: String },

    displayName: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
