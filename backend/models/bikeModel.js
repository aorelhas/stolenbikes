import mongoose from 'mongoose'

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
    isRecovered: { type: Boolean },
  },
  { timestamps: true }
);

const Bike = mongoose.model('bike', bikeSchema);

export default Bike;