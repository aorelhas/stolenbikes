import express from 'express';
const router = express.Router();
import {
  createBike,
  getBikeById,
  getBikes,
  getMyBikes,
  updateMyBike,
  deleteBike,
} from '../controllers/bikeController.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').get(getBikes);
router.post('/add', protect, createBike);
router.route('/mybikes').get(protect, getMyBikes);
// router
//   .route('/mybikes/:id')
//   .put(protect, updateMyBike)
//   .delete(protect, deleteBike);
router.route('/:id')
.get(getBikeById)
.put(protect, updateMyBike)
.delete(protect, deleteBike);

export default router;
