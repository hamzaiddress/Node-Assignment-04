const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewear/jwt.middlewear')
const productRoutes = require('./routes/products.route');
const categoryRoutes = require('./routes/category.route');
const cartRoutes = require('./routes/cart.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
require('dotenv').config();
const cluster = require('cluster');
const os = require('os');

const app = express();
const port = 3000;

// Connect to MongoDB 
// Using mongo atlas cloud 
// Change this password with atlas cloud password
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.7nworlt.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  if (cluster.isMaster) {
    const numWorkers = os.cpus().length;
  
    console.log(`Master cluster setting up ${numWorkers} workers...`);
  
    // Fork worker processes
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }
  
    // Listen for worker process exits
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
      cluster.fork();
    });
  }else{
    app.use(express.json());
    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    app.use('/product',auth.verifyToken, productRoutes);
    app.use('/category',auth.verifyToken, categoryRoutes);
    app.use('/cart',auth.verifyToken, cartRoutes);
    
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
// Middleware to parse JSON
