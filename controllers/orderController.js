/**
 * orderController.js
 * Controller logic for order-related endpoints
 */

const orders = require('../data/orders');
const users = require('../data/users');
const products = require('../data/products');

// GET /orders - return all orders
exports.getAllOrders = (req, res) => {
  res.json(orders);
};

// POST /orders - create a new order
exports.createOrder = (req, res) => {
  /*
    Expected body:
    {
      "userId": 1,
      "items": [
        { "productId": 2, "quantity": 1 },
        { "productId": 3, "quantity": 2 }
      ]
    }
  */
  const { userId, items } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order payload: require userId and items' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  let totalAmount = 0;
  const orderProducts = [];

  // Validate items and update stock
  for (const item of items) {
    const { productId, quantity } = item;
    if (typeof productId !== 'number' || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid productId or quantity in items' });
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(400).json({ error: `Product ${productId} not found` });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: `Insufficient stock for product ${productId}` });
    }

    // Deduct stock (in-memory)
    product.stock -= quantity;

    const subTotal = parseFloat((product.price * quantity).toFixed(2));
    totalAmount += subTotal;

    orderProducts.push({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      subTotal
    });
  }

  // Generate simple incremental id
  const nextId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
  const newOrder = {
    id: nextId,
    userId,
    products: orderProducts,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    status: 'created',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
};
