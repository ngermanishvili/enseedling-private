const intern = require("../model/internsModel");
const teacher = require("../model/teachersModel");
const bcrypt = require("bcrypt");
const authMiddleware = async (req, res, next) => {
  try {
    const {email, password, role} = req.body;
    if (role === "intern") {
      const user = await intern.findOne({email});
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid && email === user.email) {
        next();
      }
    } else if (role === "teacher") {
      const user = await teacher.findOne({email});
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid && email === user.email) {
        next();
      }
    } else {
      console.log("error from midleware");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};

module.exports = {authMiddleware};
