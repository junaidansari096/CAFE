import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  assignedPersonnel: [{ type: String }], // Array of names for each unit (qty)
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    tableNumber: { type: String, required: true },
    notes: { type: String }
  },
  labInstructions: { type: String }, // General notes for the cook/technician
  paymentMethod: {
    type: String,
    required: true,
    default: 'Counter'
  },
  totalPrice: { type: Number, required: true, default: 0.0 },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled', 'cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
