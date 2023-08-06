const mongoose = require("mongoose");

function connectDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
      console.log(`db connection error: ${err}`);
      throw err;
    });
}

module.exports = connectDB;
