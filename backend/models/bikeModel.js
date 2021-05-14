import mongoose from 'mongoose';

const postsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const bikeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    nSerie: { type: Number, unique: true },
    year: { type: Number },
    image: { type: String },
    location: { type: String, required: true },
    postalCode: { type: String, required: true },
    description: { type: String },
    isRecovered: { type: Boolean },
    posts: [postsSchema],
  },
  { timestamps: true }
);

const Bike = mongoose.model('bike', bikeSchema);

export default Bike;
