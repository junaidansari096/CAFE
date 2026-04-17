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
    const { id } = req.params;
    if (!id || id.length < 24) throw new Error('Invalid or missing Node ID');
    
    const { status } = req.body;
    console.log(`[ADMIN] Updating Booking ${id} to state: ${status}`);

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Target record not found' });

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('[CRITICAL] Booking Update Failure:', error);
    res.status(500).json({ message: 'System Sync Failure: ' + error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length < 24) throw new Error('Invalid or missing Node ID');
    
    console.log(`[USER] Updating Booking ${id}`);
    const booking = await Booking.findById(id);
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
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length < 24) throw new Error('Invalid or missing Node ID');
    
    console.log(`[ADMIN] Purging Booking Record: ${id}`);
    const booking = await Booking.findByIdAndDelete(id);
    if (booking) {
      res.json({ message: 'Booking ritual concluded' });
    } else {
      res.status(404).json({ message: 'Booking not found in archives' });
    }
  } catch (error) {
    console.error('[CRITICAL] Booking Purge Failure:', error);
    res.status(500).json({ message: 'System purging failure: ' + error.message });
  }
};
