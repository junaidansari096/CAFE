import express from 'express';
import { createReview, getApprovedReviews, getAllReviewsAdmin, approveReview } from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getApprovedReviews);
router.post('/', protect, upload.single('image'), createReview);

// Admin routes
router.get('/admin/all', protect, admin, getAllReviewsAdmin);
router.put('/admin/approve/:id', protect, admin, approveReview);

export default router;
