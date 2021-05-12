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

// @desc     Update Bike Details
// @route    PUT /api/bikes/mybikes/:id
// @access   Private
const updateMyBike = asyncHandler(async (req, res) => {
  const {
    brand,
    model,
    nSerie,
    year,
    location,
    postalCode,
    description,
    isRecovered,
  } = req.body;

  const bike = await Bike.findById(req.params.id);

  if (bike) {
    bike.brand = brand;
    bike.model = model;
    bike.nSerie = nSerie;
    bike.year = year;
    bike.location = location;
    bike.postalCode = postalCode;
    bike.description = description;
    bike.isRecovered = isRecovered;

    const updateBike = await bike.save();
    res.status(201).json(updateBike);
  } else {
    res.status(404);
    throw new Error('Bicicleta não encontrada!!');
  }
});

// @desc     Delete User
// @route    DELETE /api/bikes/:id
// @access   Private
const deleteBike = asyncHandler(async (req, res) => {
  const bike = await Bike.findById(req.params.id);

  if (bike) {
    await bike.remove();
    res.json({ message: 'Bicicleta removida!' });
  } else {
    res.status(404);
    throw new Error('Bicicleta não encontrada!');
  }
});

// @desc     GET Lastest stolen bike
// @route    GET /api/bikes/top
// @access   Public
const getLastBikes = asyncHandler(async (req, res) => {
  const bikes = await Bike.find({}).sort({ createdAt: -1 }).limit(6);

  res.json(bikes);
});

export {
  createBike,
  getBikeById,
  getBikes,
  getMyBikes,
  updateMyBike,
  deleteBike,
  getLastBikes
};
