const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const connectDB = require("./DB/index");

const registerUser = require("./Controllers/RegisterController");
const loginUser = require("./Controllers/LoginController");

connectDB(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/register", registerUser);
app.use("/login", loginUser);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Started on port 4000");
});
