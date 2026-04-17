import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    labInstructions
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
      labInstructions
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order (User)
// @route   PUT /api/orders/:id/cancel
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Cannot cancel an order that is already being prepared' });
    }

    order.status = 'Cancelled';
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length < 24) throw new Error('Invalid Order ID');

    const { status } = req.body;
    console.log(`[ADMIN] Updating Order ${id} to state: ${status}`);

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('[CRITICAL] Order Update Failure:', error);
    res.status(500).json({ message: 'Update failure: ' + error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length < 24) throw new Error('Invalid Order ID');

    console.log(`[ADMIN] Purging Order Record: ${id}`);
    const order = await Order.findByIdAndDelete(id);
    if (order) {
      res.json({ message: 'Order purged from history' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('[CRITICAL] Order Purge Failure:', error);
    res.status(500).json({ message: 'Purge failure: ' + error.message });
  }
};
