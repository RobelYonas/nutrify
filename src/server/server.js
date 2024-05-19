require('dotenv').config({ path: '../../.env' });// Ensure this is at the top
const express = require('express');
const cors = require('cors'); // Import cors
const connectDB = require('./config/database');
const authRoutes = require('./routes/AuthRoutes');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
