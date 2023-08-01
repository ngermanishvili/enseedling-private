const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/AuthMiddleware");
const { login } = require("../Services/Auth-services");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const credentials = req.body;

    const { token, existUser } = await login(credentials);

    res.send({ status: true, token: token, existUser });
  } catch (error) {
    console.log("error: " + error);
  }
});

module.exports = router;
