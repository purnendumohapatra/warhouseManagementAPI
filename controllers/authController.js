const express = require("express");
const catchAsync = require("../utils/catchAsync");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");

const generateJwtToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

//The function which comes into action during sign Up process.

exports.signUpUser = catchAsync(async (req, res) => {
  const createdUser = await user.create(req.body);
  const token = generateJwtToken(createdUser._id);
  res.status(200).json({
    status: "success",
    message: "The user has been successfully signed up",
  });
});

//The function which comes into action during login process.

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new appError(`Sorry you have not given the email and password`, 400));
  }

  const User = await user.findOne({ email: email }).select("+password");
  let value = await user.authenticateUserDetails(user.password, password);

  if (!User || !value) {
    next(new appError(`Incorrect Password or email`, 401));
  } else {
    token = generateJwtToken(user._id);
    res.status(200).json({
      status: "You are our genuine user and you have successfully logged In..",
      token: token,
    });
  }
});
