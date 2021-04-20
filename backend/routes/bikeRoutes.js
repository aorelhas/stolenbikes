import express from 'express';
const router = express.Router();
import {
  createBike,
  getBikeById,
  getBikes,
} from '../controllers/bikeController.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').get(getBikes);
router.post('/add', protect, createBike);
router.route('/:id').get(getBikeById);

export default router;
