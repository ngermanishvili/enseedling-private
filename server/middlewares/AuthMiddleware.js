const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "ngermanishvili", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
            } else {
                try {
                    const user = await User.findById(decodedToken.id);
                    if (user) {
                        const { email, firstName } = user;
                        res.json({ status: true, user: { email, firstName } });
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
};
