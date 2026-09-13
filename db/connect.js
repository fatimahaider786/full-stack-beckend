const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const opts = {
      bufferCommands: false,
    };

    cachedConnection = await mongoose.connect(process.env.MONGO_URI, opts);
    console.log("DB CONNECT SUCCESSFULLY");
    return cachedConnection;
  } catch (error) {
    console.error("ERROR IN DB CONNECTION:", error);
    throw error;
  }
};

module.exports = connectDB;