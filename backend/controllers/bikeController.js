import express from 'express';
import asyncHandler from 'express-async-handler';

import Bike from '../models/bikeModel.js';

//@desc     Create new Lost Bike
//@route    POST /api/bike/add
//@access   Private
const createBike = asyncHandler(async (req, res) => {
  const { brand, model, year, location, postalCode, isRecovered } = req.body;

  const user = localStorage.getItem('userInfo');

  const stolenBike = new Bike({
    user: user,
    brand,
    model,
    year,
    location,
    postalCode,
    isRecovered,
  });

  if (stolenBike) {
    const createdBike = await Bike.save();

    res.status(201).json(createdBike);
  }
});

export { createBike };
