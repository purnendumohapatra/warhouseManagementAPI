const express = require("express");
const catchAsync = require("../utils/catchAsync");
const user = require("../models/userModel");

exports.signUpUser = catchAsync(async (req, res) => {
  const createdUser = await user.create(req.body);
  res
    .status(200)
    .json({
      status: "success",
      message: "The user has been successfully signed up",
    });
});
