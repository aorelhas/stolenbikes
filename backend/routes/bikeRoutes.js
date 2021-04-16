import express from 'express';
const router = express.Router();

import { createBike } from '../controllers/bikeController.js';

router.route('/').post(createBike);

export default router;
