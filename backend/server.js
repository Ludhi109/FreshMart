const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy database
let orders = [];

// Routes
app.get('/', (req, res) => {
  res.send('FreshMart API is running...');
});

// Orders API
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const order = {
    ...req.body,
    id: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString(),
    status: 'Processing'
  };
  orders.unshift(order);
  res.status(201).json(order);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
