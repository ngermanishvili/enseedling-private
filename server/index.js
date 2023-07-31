const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes")
const cookieParser = require("cookie-parser")
const app = express();

app.listen(4000, () => {
    console.log("Server Started on port 4000");
});

const mongoDBURI = "mongodb+srv://nikagermanishvili5:germana@newcluster.bpvzbg5.mongodb.net/jwt";

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongo successfully connected');
}).catch(err => {
    console.log(err.message);
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use("/", authRoutes);