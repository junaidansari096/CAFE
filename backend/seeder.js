import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global assets copied here for backend independent seeding
const SEED_IMAGES = {
  ESPRESSO: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400",
  CRYO_BREW: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400",
  LATTE: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=400",
  TEA: "https://images.unsplash.com/photo-1594631252845-29fc4586d5d7?auto=format&fit=crop&q=80&w=400",
  PASTRY: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=400"
};

const products = [
  { title: "Neon Espresso", price: "$6.50", category: "COFFEE", description: "Sonic-aged beans extracted at 14 bars. Carbon-filtered result.", image: SEED_IMAGES.ESPRESSO },
  { title: "Cryo-Brew", price: "$8.00", category: "COFFEE", description: "48-hour cold maceration. Sub-zero thermal state.", image: SEED_IMAGES.CRYO_BREW },
  { title: "Quantum Latte", price: "$7.25", category: "COFFEE", description: "Dual-state: thermal core and chilled mantle.", image: SEED_IMAGES.LATTE },
  { title: "Olive Extract", price: "$9.50", category: "TEA", description: "Single-origin Yirgacheffe. Saline-optimized catalyst.", image: SEED_IMAGES.TEA },
  { title: "Nebula Tart", price: "$12.00", category: "PASTRIES", description: "Molecular crust with neon-infused core.", image: SEED_IMAGES.PASTRY }
];

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/stich_demo';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for protocol synchronization');

    // Wipe existing catalog to ensure clean state
    await Product.deleteMany();
    console.log('⚠️ Purged existing specimen data');

    // Inject new data
    await Product.insertMany(products);
    console.log('✅ Synchronized 5 core specimens to the database');

    process.exit(0);
  } catch (err) {
    console.error('❌ Sync Protocol Failure:', err);
    process.exit(1);
  }
};

seedDatabase();
