const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "ngermanishvili", {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "incorrect Email") errors.email = "That emails is not registered"
    if (err.message === "incorrect Password") errors.email = "That password is  Incorrect"


    console.log(err);
    if (err.message === "incorrect email") {
        errors.email = "Email is already registered";
    }


    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};


module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.create({ email, password });
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors, created: false });
    }
};


module.exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.login(email, password  );
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(200).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors, created: false });
    }
};
