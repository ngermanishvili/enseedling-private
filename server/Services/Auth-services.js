const StudentUsers = require("../model/authModel");
const TeacherUsers = require("../model/authTeachers");
const { createToken } = require("../utils/index");
const {hashPassword, comparePassword } = require('../helpers/authHelper');

const register = async (user) => {
  try {
    if (!Object.keys(user).length) {
      throw { statusCode: 400, message: "bad request" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password,firstName,lastName,status } = user;
    const existUser = await StudentUsers.findOne({ email });
    const teacherUser= await TeacherUsers.findOne({ email });
    if (existUser || teacherUser) {
      throw { statusCode: 400, message: "user already exist" };
    }
    if(!email){
      throw { statusCode: 400, message: "Email is required" };
    }
    if (!emailRegex.test(email)) {
      throw { statusCode: 400, message: "Email is not valid" };
    }
    if(!password){
      throw { statusCode: 400, message: "Password is required" };
    }
    if(!firstName){
      throw { statusCode: 400, message: "firstName is required" };
    }
    if(!lastName){
      throw { statusCode: 400, message: "lastName is required" };
    }
    if(!status || (status!=='student' && status!=='teacher')){
      throw { statusCode: 400, message: "status is required" };
    }

    const hashPass= await hashPassword(password);
    if(status === 'student'){
      return await StudentUsers.create({ email, password:hashPass, firstName,lastName,status });
    } else if(status === 'teacher'){
      return await TeacherUsers.create({ email, password: hashPass, firstName,lastName,status });
    }
  
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
    const existUser = await StudentUsers.findOne({ email });
   
    if (!existUser) {
      throw { statusCode: 400, message: "user not exist" };
    }
    const comparePass = await comparePassword(password, existUser.password)
    if(!comparePass){
      throw { statusCode: 400, message: "password not correct" };
    }

    const token = createToken(existUser._id);
    return { token, existUser };
  } catch (error) {
    console.log("error occurred in login function", error);
    throw error;
  }
};

module.exports = { register, login };
