import asyncHandler from 'express-async-handler';
import Bike from '../models/bikeModel.js';
import User from '../models/userModel.js';

//@desc     Create new Lost Bike
//@route    POST /api/bike/add
//@access   Private
const createBike = asyncHandler(async (req, res) => {
  const {
    brand,
    model,
    year,
    nSerie,
    location,
    postalCode,
    description,
    isRecovered,
  } = req.body;

  const stolenBike = new Bike({
    user: req.user._id,
    brand,
    model,
    year,
    nSerie,
    // image,
    location,
    postalCode,
    description,
    isRecovered,
  });

  if (stolenBike) {
    const createdBike = await stolenBike.save();

    res.status(201).json(createdBike);
  }
});

// @desc     Fetch all bikes
// @route    GET /api/bike
// @access   Public
const getBikes = asyncHandler(async (req, res) => {
  const bikes = await Bike.find();

  if (bikes) {
    res.json(bikes);
  } else {
    res.status(404);
    throw new Error('There is no Bikes!');
  }
});

// @desc     Fetch single bike
// @route    GET /api/bike/:id
// @access   Public
const getBikeById = asyncHandler(async (req, res) => {
  const bike = await Bike.findById(req.params.id);

  if (bike) {
    res.json(bike);
  } else {
    res.status(404);
    throw new Error('Bike not found!!');
  }
});

// @desc     Fetch all bikes from specific user
// @route    GET /api/bike/mybikes
// @access   Private
const getMyBikes = asyncHandler(async (req, res) => {
  const myBike = await Bike.find({ user: req.user._id });

  if (myBike) {
    res.json(myBike);
  } else {
    res.status(404);
    throw new Error('There is no bikes registered as lost.');
  }
});

export { createBike, getBikeById, getBikes, getMyBikes };
