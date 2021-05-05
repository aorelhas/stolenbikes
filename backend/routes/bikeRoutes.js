import express from 'express';
const router = express.Router();
import {
  createBike,
  getBikeById,
  getBikes,
  getMyBikes,
} from '../controllers/bikeController.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').get(getBikes);
router.post('/add', protect, createBike);
router.route('/mybikes').get(protect, getMyBikes);
router.route('/:id').get(getBikeById);

export default router;
