import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

export default User;
