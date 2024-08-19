const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = "mongodb://127.0.0.1:27017/react_mern"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
  module.exports = connectToMongo;
