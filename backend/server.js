const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const eventRoutes = require('./routes/events'); // Import routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/events', eventRoutes); // Mount the routes for events

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Calendar API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
