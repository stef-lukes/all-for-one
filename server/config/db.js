const mongoose = require("mongoose");

const connectDB = async () => {
  let database;
  process.env.NODE_ENV === "development"
    ? (database = process.env.MONGO_URI)
    : (database = process.env.MONGO_URI_TEST);
  try {
    const conn = await mongoose.connect(database);
    console.log(`MongoDB Connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
