require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const {s3Uploadv2, s3Uploadv3} = require("./s3Service");
const uuid = require("uuid").v4;

const app = express();
app.use(cors());

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
app.listen(4000, () => {
  console.log("Server Started on port 4000");
});

const mongoDBURI =
  "mongodb+srv://samxara:samxara@cluster0.j0xk7o2.mongodb.net/jwt";

mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo successfully connected");
  })
  .catch((err) => {
    console.log(err.message);
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

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
