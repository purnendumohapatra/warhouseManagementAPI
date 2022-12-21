const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createAproduct);

productRouter
  .route("/:id")
  .get(productController.getAproduct)
  .delete(productController.deleteAproduct)
  .patch(productController.updateTheData);

module.exports = productRouter;
