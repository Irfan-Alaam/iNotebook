// backend/db.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
console.log("Mongo URI:", mongoURI); // Debug check

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Exit on error
  }
}

// Remove auto-execution here! Just export the function.
module.exports = connectToMongo;