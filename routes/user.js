const express = require("express");
const router = express.Router();

const {registerUser, loginUser} = require("../controller/user");

router.route("/user/register").post(registerUser);

router.route("/user/login").post(loginUser);

module.exports = router;
