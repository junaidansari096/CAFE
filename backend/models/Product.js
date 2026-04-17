import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  discountPrice: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    uppercase: true
  },
  rating: {
    type: Number,
    default: 5.0
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1544787210-22bb7ed05f56?auto=format&fit=crop&q=80&w=400'
  },
  availability: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 100
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
