import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for guest checkouts
  },
  guestName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  occasion: {
    type: String,
    enum: ['SOLO', 'DUO', 'COLLECTIVE', 'PRIVATE'],
    default: 'SOLO',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'completed'],
    default: 'pending',
  },
  tableNumber: {
    type: Number,
  }
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
