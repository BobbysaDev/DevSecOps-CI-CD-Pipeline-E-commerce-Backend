/**
 * userController.js
 * Controller logic for user-related endpoints
 */

const users = require('../data/users');

// GET /users - return all users
exports.getAllUsers = (req, res) => {
  res.json(users);
};
