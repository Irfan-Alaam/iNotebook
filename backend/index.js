// backend/index.js
require('dotenv').config({ path: '.env.local' }); // Load ONCE from root
const connectToMongo = require('./db'); // Import function (not auto-executed)
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start server AFTER MongoDB connects
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`iNotebook backend running at http://localhost:${port}`);
  });
});