const express = require("express");
const signUpuserRouter = express.Router();
const authController = require("../controllers/authController");

signUpuserRouter.route("/").post(authController.signUpUser);
module.exports = signUpuserRouter;
