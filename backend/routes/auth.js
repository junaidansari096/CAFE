import express from 'express';
import { signup, login, getProfile, getRewardsData } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.get('/rewards', protect, getRewardsData);

export default router;
