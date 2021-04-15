const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number },
    location: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('bike', bikeSchema);
