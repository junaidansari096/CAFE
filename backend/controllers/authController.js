import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ 
      name, 
      email, 
      password,
      rewardsPoints: 50,
      rewardsHistory: [{
        type: 'signup',
        points: 50,
        description: 'Welcome bonus — first-time neural link established',
      }]
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin',
      rewardsPoints: user.rewardsPoints,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin',
        rewardsPoints: user.rewardsPoints,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin',
      rewardsPoints: user.rewardsPoints || 0,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// New: Get full rewards data for the authenticated user
export const getRewardsData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('rewardsPoints rewardsHistory name email createdAt');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compute derived stats
    const history = user.rewardsHistory || [];
    const totalEarned = history.filter(h => h.points > 0).reduce((sum, h) => sum + h.points, 0);
    const totalRedeemed = Math.abs(history.filter(h => h.points < 0).reduce((sum, h) => sum + h.points, 0));
    const orderRewards = history.filter(h => h.type === 'order');
    const reservationRewards = history.filter(h => h.type === 'reservation');
    const signupReward = history.find(h => h.type === 'signup');

    res.json({
      rewardsPoints: user.rewardsPoints || 0,
      totalEarned,
      totalRedeemed,
      totalOrders: orderRewards.length,
      totalReservations: reservationRewards.length,
      hasSignupBonus: !!signupReward,
      memberSince: user.createdAt,
      history: history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
