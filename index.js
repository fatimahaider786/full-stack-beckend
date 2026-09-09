const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db/connect');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the uploads folder properly (Absolute Path)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Mounting
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

// Database Connection & Server Start
connectDB()
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server is up and listening on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('DB Connection Error:', error);
  });

module.exports = app;