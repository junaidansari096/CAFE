import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow frontend origins (dev + production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL, // e.g. https://future-brew.vercel.app
].filter(Boolean);

app.use(cors({
  origin: '*', // Allow all for local testing to eliminate CORS blocks
  credentials: true,
}));

app.use(express.json());

// Serve static upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health-check endpoint (useful for Render / monitoring)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Serve Frontend in Production ---
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendPath));

  // SPA fallback — send index.html for any non-API route
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running... (development)');
  });
}

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/stich_demo';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Cloud');
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
};

// Only connect and listen if not in a serverless environment (like Vercel production)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  });
} else {
  // In Vercel serverless, we just connect. Vercel handles the invocation.
  connectDB();
}

export default app;
