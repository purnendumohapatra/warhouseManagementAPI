const express = require("express");
const catchAsync = require("../utils/catchAsync");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateJwtToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

exports.signUpUser = catchAsync(async (req, res) => {
  const createdUser = await user.create(req.body);
  const token = generateJwtToken(createdUser._id);
  res.status(200).json({
    status: "success",
    message: "The user has been successfully signed up",
  });
});
