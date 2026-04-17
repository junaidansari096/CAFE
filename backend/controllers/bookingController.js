import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  const { date, time, guests, occasion } = req.body;
  try {
    const booking = await Booking.create({
      user: req.user._id,
      date,
      time,
      guests,
      occasion,
    });

    // Add 10 points for every booking
    await User.findByIdAndUpdate(req.user._id, { $inc: { rewardsPoints: 10 } });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'name email').sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.status = status;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      Object.assign(booking, req.body);
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
