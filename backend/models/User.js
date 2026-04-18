import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const rewardLogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['signup', 'order', 'reservation', 'bonus', 'redeemed'],
    required: true,
  },
  points: { type: Number, required: true },
  description: { type: String, default: '' },
  refId: { type: String, default: '' }, // order/booking ID reference
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky',
  },
  rewardsPoints: {
    type: Number,
    default: 0,
  },
  rewardsHistory: [rewardLogSchema],
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
