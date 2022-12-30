const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The user must have a name"],
  },

  email: {
    type: String,
    required: [true, "The User must have an email"],
    trim: true,
    unique: [
      true,
      "The user must have an unique email ID and it seems that this email Id has been taken",
    ],
    validate: [validator.isEmail, "Please provide a valid email ID"],
  },

  role: {
    type: String,
    enum: {
      values: ["user", "sales Manager", "admin", "manager"],
      message: "The user role is either: user,sales manager,admin,manager",
    },
    default: "user",
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "The Password and confirm password fields are not same",
    },
  },

  active: {
    type: Boolean,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password,12);
  this.confirmPassword = undefined;
});

const user = mongoose.model("user", userSchema);
module.exports = user;
