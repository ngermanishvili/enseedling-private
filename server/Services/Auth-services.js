const User = require("../model/authModel");
const { createToken } = require("../utils/index");
const register = async (user) => {
  try {
    if (!Object.keys(user).length) {
      throw { statusCode: 400, message: "bad request" };
    }
    const { email, password, ...rest } = user;
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw { statusCode: 400, message: "user already exist" };
    }
    const newUser = await User.create({ email, password, ...rest });

    return newUser;
  } catch (error) {
    console.log("error occurred in register function", error);
    throw error;
  }
};

const login = async (user) => {
  try {
    if (!Object.keys(user).length) {
      throw { statusCode: 400, message: "bad request" };
    }
    const { email, password } = user;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      throw { statusCode: 400, message: "user not exist" };
    }

    const token = createToken(existUser._id);
    return { token, existUser };
  } catch (error) {
    console.log("error occurred in login function", error);
    throw error;
  }
};

module.exports = { register, login };
