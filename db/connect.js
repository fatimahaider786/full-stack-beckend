const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECT SUCCESSFULLY");
  } catch (error) {
    console.error("ERROR IN DB CONNECTION:", error);
    process.exit(1);
  }
};

module.exports = connectDB;