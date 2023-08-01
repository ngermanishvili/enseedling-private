const User = require("../model/authModel");
const bcrypt = require("bcrypt");
const authMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password);
    console.log(
      "🚀 ~ file: AuthMiddleware.js:8 ~ authMiddleware ~ isValid:",
      isValid
    );

    if (isValid && email === user.email) {
      next();
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};

module.exports = { authMiddleware };
