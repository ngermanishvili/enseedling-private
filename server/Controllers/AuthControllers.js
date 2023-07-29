const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "ngermanishvili", {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    console.log(err);
    let errors = { email: "", password: "" };

    if (err.message === "Incorrect Password") {
        errors.password = "Incorrect password";
    }

    if (err.message === "Incorrect Email") {
        errors.email = "Incorrect email or email not registered";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            if (properties.path === 'email') {
                if (!values.email) {
                    errors.email = "Email is required";
                }
            }
            if (properties.path === 'password') {
                if (!values.password) {
                    errors.password = "Password is required";
                }
            }
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};



module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
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
        res.json({ errors, created: false });
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};