/**
 * orders.js - in-memory mock orders data
 * Fields: id, userId, products, totalAmount, status
 */
module.exports = [
  {
    id: 1,
    userId: 1,
    products: [
      { productId: 2, name: 'Jeans', unitPrice: 49.99, quantity: 1, subTotal: 49.99 }
    ],
    totalAmount: 49.99,
    status: 'completed',
    createdAt: new Date().toISOString()
  }
];
