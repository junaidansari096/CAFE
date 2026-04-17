import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  discountPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Hot Coffee', 'Iced Coffee', 'Pastry', 'Beans', 'Brew Gear'],
    default: 'Hot Coffee',
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', // Default high-quality placeholder
  },
  stock: {
    type: Number,
    default: 99,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 5.0,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
