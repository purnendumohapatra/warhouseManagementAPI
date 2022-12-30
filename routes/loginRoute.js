const express = require("express");
const loginRouter = express.Router();
const authController = require("../controllers/authController");

loginRouter.route("/").post(authController.login);

module.exports = loginRouter;
