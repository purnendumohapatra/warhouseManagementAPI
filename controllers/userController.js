const express = require("express");
const catchAsync = require("../utils/catchAsync");
const user = require("../models/userModel");

//Getting all the users.
exports.getAllusers = catchAsync(async (req, res) => {
  const allUsers = await user.find();
  res.status(200).json({
    status: "success",
    totalNumberOfUsers: allUsers.length,
    message: "Fetched All the user Data sucessfully",
    data: allUsers,
  });
});

//Getting a single user.
exports.getAnUser = catchAsync(async (req, res) => {
  const fetchedData = await user.findById(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    message: "data fetched successfully",
    data: fetchedData,
  });
});

//Creating an user.
exports.createAnUser = catchAsync(async (req, res) => {
  const userCreated = await user.create(req.body);
  res.status(200).json({
    status: "success",
    message: "created the user Data sucessfully",
    data: userCreated,
  });
});

//Upadting an user data.
exports.updateTheUserData = catchAsync(async (req, res) => {
  const updatedData = await user.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    message: "The data has been successfully updated",
    data: updatedData,
  });
});

//Deleting an user data
exports.deleteAsingleUserData = catchAsync(async (req, res) => {
  const deletedData = await user.findByIdAndDelete(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    message: "The data has been successfully deleted",
    data: deletedData,
  });
});
