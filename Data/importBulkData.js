const express = require("express");
const fileSystem = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const product = require("../models/productModel");

dotenv.config({ path: "../config.env" });

const bulkProductData = fileSystem.readFileSync(
  `${__dirname}/products.json`,
  "utf-8"
);

const bulkArrayObject = JSON.parse(bulkProductData);

const insertBulkData = async () => {
  try {
    const createdProducts = await product.create(bulkArrayObject);
    console.log(`The data has been successfully pushed`);
  } catch (error) {
    console.log(error);
  }
};

const deleteBulkData = async () => {
  try {
    const deletedData = await product.deleteMany();
    console.log(`Deleted successfully`);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] == "--insertAllData") {
  insertBulkData();
} else if (process.argv[2] == "--deleteAllData") {
  deleteBulkData();
}

mongoose.connect(process.env.DB_URL).then((con) => {
  console.log(
    `The server has been successfully connected with the Database 😎😎💖`
  );
});
