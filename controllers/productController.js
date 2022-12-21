const express = require("express");
const product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

//Getting all the products.
exports.getAllProduct = catchAsync(async (req, res) => {
  const queryObject = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el, index) => {
    delete queryObject[el];
  });
  const queryString = JSON.stringify(queryObject);
  const replacedValue = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
    return `$${match}`;
  });
  const modiString = JSON.parse(replacedValue);
  const allProducts = await product.find(modiString);
  res.status(200).json({
    status: "success",
    totalNumberOfProducts: allProducts.length,
    data: allProducts,
  });
});

//creating a single product
exports.createAproduct = catchAsync(async (req, res) => {
  const createdProduct = await product.create(req.body);
  res.status(200).json({ status: "success", data: createdProduct });
});

//Fetching a single product.
exports.getAproduct = catchAsync(async (req, res) => {
  const singleProduct = await product.findById(req.params.id);
  if (!singleProduct) {
    next(new appError(`can't find the product`, 404));
  } else {
    res.status(200).json({
      status: "success",
      message: "Product Data successfully fetched",
      data: singleProduct,
    });
  }
});

//Updating a single data.
exports.updateTheData = catchAsync(async (req, res, next) => {
  const updatedData = await product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    message: "Data successfully updated",
    data: updatedData,
  });
});

//Deleting a single product.
exports.deleteAproduct = catchAsync(async (req, res) => {
  const deletedData = await product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Data deleted successfully",
    data: deletedData,
  });
});
