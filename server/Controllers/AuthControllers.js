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
        const { firstName, lastName, email, password } = req.body; // Extract lastName from the request body
        const user = await User.create({ firstName, lastName, email, password }); // Save lastName along with firstName, email, and password
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

module.exports.getUserData = async (req, res, next) => {
    try {
        // Get the user data from the JWT token
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, "ngermanishvili", async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                } else {
                    try {
                        const user = await User.findById(decodedToken.id);
                        if (user) {
                            const { email, firstName, lastName } = user;
                            res.json({ status: true, user: { email, firstName, lastName } });
                        } else {
                            res.json({ status: false });
                        }
                    } catch (error) {
                        console.log(error);
                        res.json({ status: false });
                    }
                }
                next();
            });
        } else {
            res.json({ status: false });
            next();
        }
    } catch (err) {
        console.log(err);
        res.json({ status: false });
    }
};