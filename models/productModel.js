const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "The product must always have a name"],
    unique: [true, "The Product must have an unique name"],
    maxlength: [50, "A product must have a maximum length of 50 characters"],
    minlength: [7, "A product must have a minimum of 7 characters"],
  },

  category: {
    type: String,
    required: [true, "The product must always have a category"],
  },

  CustomerRating: {
    type: String,
    required: true,
    default: "3.7 stars",
    max: [5, "A product must have a rating between 1 and 5"],
    min: [1, "A product must have a minimum rating of 1"],
  },

  price: {
    type: Number,
    required: [true, "The product must have a price"],
  },

  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "Discount price must be lesser than the regular price",
    },
  },

  summary: {
    type: String,
    required: [true, "The Product must have a summary"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "The product must have a description"],
    trim: true,
  },

  image: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: [true, "The quantity should always be available"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const product = mongoose.model("Product", productSchema);
module.exports = product;
