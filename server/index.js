require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const {s3Uploadv2, s3Uploadv3} = require("./s3Service");
const uuid = require("uuid").v4;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/index");

const registerUser = require("./Controllers/RegisterController");
const loginUser = require("./Controllers/LoginController");

const app = express();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "video") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {fileSize: 1000000000, files: 2},
});

app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    console.log(results);
    return res.json({status: "success"});
  } catch (err) {
    console.log(err);
  }
});
connectDB(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/register", registerUser);
app.use("/login", loginUser);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Started on port 4000");
});
