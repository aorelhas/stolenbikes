import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateToken.js'

import User from '../models/userModel.js';

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  console.log(res);
});

// @desc     Register new User
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(res);
});

export { registerUser, authUser };
