const mongoose = require("mongoose");
const { databaseUri } = require("../config");

const connectDatabase = async () => {
  try {
    await mongoose.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
