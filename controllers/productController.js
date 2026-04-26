/**
 * productController.js
 * Controller logic for product-related endpoints
 */

const products = require('../data/products');

// GET /products - return all products
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// GET /products/:id - return a single product
exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product id' });
  }
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
};
