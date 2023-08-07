const express = require("express");
const router = express.Router();
const { register } = require("../Services/Auth-services");

router.post("/", async (req, res) => {
  try {
    const userData = req.body;

    const userRegister = await register(userData);

    res.status(200).send(userRegister);
  } catch (error) {}
});

module.exports = router;
