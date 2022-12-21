const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter
  .route("/")
  .get(userController.getAllusers)
  .post(userController.createAnUser);

userRouter
  .route("/:id")
  .get(userController.getAnUser)
  .delete(userController.deleteAsingleUserData)
  .patch(userController.updateTheUserData);

module.exports = userRouter;
