const intern = require("../model/internsModel");
const teacher = require("../model/teachersModel");
const {createToken} = require("../utils/index");
const register = async (user) => {
  try {
    if (!Object.keys(user).length) {
      throw {statusCode: 400, message: "bad request"};
    }
    const {email, password, role, ...rest} = user;
    if (role === "intern") {
      const existUser = await intern.findOne({email});
      if (existUser) {
        throw {statusCode: 400, message: "user already exist"};
      }
      const newUserIntern = await intern.create({email, password, ...rest});

      return newUserIntern;
    } else if (role === "teacher") {
      const existUser = await teacher.findOne({email});
      if (existUser) {
        throw {statusCode: 400, message: "user already exist"};
      }
      const newUserTeacher = await teacher.create({email, password, ...rest});

      return newUserTeacher;
    } else {
      console.log("first");
    }
  } catch (error) {
    console.log("error occurred in register function", error);
    throw error;
  }
};

const login = async (user) => {
  try {
    if (!Object.keys(user).length) {
      throw {statusCode: 400, message: "bad request"};
    }
    const {email, password, role} = user;
    if (role === "intern") {
      const existUser = await intern.findOne({email});

      if (!existUser) {
        throw {statusCode: 400, message: "user not exist"};
      }

      const token = createToken(existUser._id);
      return {token, existUser};
    } else if (role === "teacher") {
      const existUser = await teacher.findOne({email});

      if (!existUser) {
        throw {statusCode: 400, message: "user not exist"};
      }

      const token = createToken(existUser._id);
      return {token, existUser};
    }
  } catch (error) {
    console.log("error occurred in login function", error);
    throw error;
  }
};

module.exports = {register, login};
