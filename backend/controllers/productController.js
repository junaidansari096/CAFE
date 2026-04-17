import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { title, price, discountPrice, category, description, image, availability, stock, featured } = req.body;
    const product = new Product({
      title,
      price,
      discountPrice,
      category,
      description,
      image,
      availability,
      stock,
      featured
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const { title, price, discountPrice, category, description, image, availability, stock, featured } = req.body;
      
      product.title = title || product.title;
      product.price = price || product.price;
      product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
      product.category = category || product.category;
      product.description = description || product.description;
      product.image = image || product.image;
      product.availability = availability !== undefined ? availability : product.availability;
      product.stock = stock !== undefined ? stock : product.stock;
      product.featured = featured !== undefined ? featured : product.featured;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ message: 'Specimen purged from database successfully.' });
    } else {
      res.status(404).json({ message: 'Specimen not localized in current sector.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Purge sequence failure: ' + error.message });
  }
};
