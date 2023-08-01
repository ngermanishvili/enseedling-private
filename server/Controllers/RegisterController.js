const express = require("express");
const router = express.Router();
const {register} = require("../Services/Auth-services");

router.post("/", async (req, res) => {
  try {
    const userData = req.body;

    console.log(
      "🚀 ~ file: RegisterController.js:8 ~ router.post ~ userData:",
      userData
    );
    const userRegister = await register(userData);

    res.send(userRegister);
  } catch (error) {}
});

module.exports = router;
