import express from 'express';
import { createBooking, getMyBookings, getAllBookingsAdmin, updateBookingStatus, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getMyBookings);

// Admin routes
router.get('/admin/all', protect, admin, getAllBookingsAdmin);
router.put('/admin/status/:id', protect, admin, updateBookingStatus);
router.put('/admin/update/:id', protect, admin, updateBooking);
router.delete('/admin/delete/:id', protect, admin, deleteBooking);

export default router;
