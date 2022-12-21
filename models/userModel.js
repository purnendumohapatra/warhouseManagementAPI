const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The user must have a name"],
  },

  email: {
    type: String,
    required: [true, "The User must have an email"],
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email ID"],
  },

  role: {
    type: String,
    enum: ["Manager", "User", "admin", "Sales Manager"],
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
