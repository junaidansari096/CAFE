import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Product from './models/Product.js';
import Booking from './models/Booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
  {
    name: 'Neon Espresso',
    description: 'High-voltage caffeine extraction with notes of dark chocolate and electric citrus.',
    price: 4.50,
    category: 'Hot Coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    rating: 5.0
  },
  {
    name: 'Cyber Cold Brew',
    description: '18-hour slow-drip extraction served over crystalized ice fragments.',
    price: 5.50,
    category: 'Iced Coffee',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    rating: 4.9
  },
  {
    name: 'Protocol Latte',
    description: 'Silky micro-foam with a double node of Brazilian origin beans.',
    price: 4.80,
    category: 'Hot Coffee',
    image: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80&w=800',
    isFeatured: false,
    rating: 4.8
  },
  {
    name: 'Data-Disk Pastry',
    description: 'Layered flaky dough with a core of synthetic vanilla bean cream.',
    price: 3.50,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    isFeatured: false,
    rating: 4.7
  },
  {
    name: 'Origin Roast Beans',
    description: '1kg bag of high-altitude beans for local node extraction.',
    price: 24.00,
    category: 'Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
    rating: 5.0
  }
];

const seedData = async () => {
  try {
    console.log('🧹 Clearing old database data...');
    await mongoose.connect(process.env.MONGO_URI);
    
    await User.deleteMany();
    await Product.deleteMany();
    await Booking.deleteMany();

    console.log('✅ Database Cleared.');

    // Create Admin
    const adminUser = await User.create({
      name: 'Network Admin',
      email: 'admin@cafe.io',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'admin'
    });

    console.log('✅ Admin User Created (admin@cafe.io / admin123)');

    // Create Products
    await Product.insertMany(products);
    console.log('✅ 5 Premium Products Created.');

    console.log('\n✨ ALL DATA SEEDED SUCCESSFULLY!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
