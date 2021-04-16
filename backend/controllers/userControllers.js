import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password. Verify');
  }
});

// @desc     Register new User
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, name, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('Email already registered. Log In.');
  }

  const user = await User.create({
    username,
    email,
    name,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user Data. Verify');
  }
});

export { registerUser, authUser };
