  const mongoose = require("mongoose");

  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

  db.on("disconnected", () => {
    console.log("Disconnected from the database");
  });

  module.exports = db;
