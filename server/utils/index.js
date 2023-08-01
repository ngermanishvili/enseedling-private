const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(id) {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60000,
    }
  );
  return token;
}

module.exports = { createToken };
