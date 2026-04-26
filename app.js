/**
 * app.js - Main entry point for the e-commerce backend
 * - Sets up Express server
 * - Mounts routes
 * - Adds basic error handling
 */

const express = require('express');
const cors = require('cors');
const app = express();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for browser-based frontends (adjust origin in production)
app.use(cors());

// Mount routers
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

// Root health endpoint for readiness checks
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

// Metrics placeholder for future Prometheus integration
app.get('/metrics', (req, res) => {
  res.type('text/plain').send('Metrics will be exposed here');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Internal error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
