import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  getUserById,
  updateUserByAdmin,
  updateUserProfile,
  deleteUserByAdmin,
  deleteUser,
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').post(registerUser);

router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, deleteUser)
  .delete(protect, admin, deleteUserByAdmin)
  .get(protect, getUserById)
  .put(protect, admin, updateUserByAdmin);

export default router;
