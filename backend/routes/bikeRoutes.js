import express from 'express';
const router = express.Router();
import { createBike } from '../controllers/bikeController.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').post(createBike);

export default router;
