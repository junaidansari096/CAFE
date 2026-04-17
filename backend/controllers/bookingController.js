import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  const { date, time, guests, occasion, guestName, email, phoneNumber } = req.body;
  
  try {
    // If logged in, use user data. If guest, use provided name/email.
    const bookingData = {
      date,
      time,
      guests,
      occasion,
      guestName: guestName || (req.user ? req.user.name : 'Unknown Guest'),
      email: email || (req.user ? req.user.email : 'Unknown@Email.com'),
      phoneNumber: phoneNumber || (req.user ? req.user.phoneNumber : ''),
      user: req.user ? req.user._id : null
    };

    const booking = await Booking.create(bookingData);

    // If logged in, Add 10 points for every booking
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { $inc: { rewardsPoints: 10 } });
    }

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
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedBooking) {
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Shift registry node not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Authorization shift failure: ' + error.message });
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
