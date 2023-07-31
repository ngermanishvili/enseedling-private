const { register, login, getUserData } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.get("/get-user-data", getUserData); // Add the route for getting user data

module.exports = router;
