const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProduct,
  photo,
  getAllProducts,
  getProductsByCategory,
} = require("../controller/product");

//create
router.route("/product/create").post(createProduct);

//read
router.route("/product/:productId").get(getProduct);
router.route("/product/photo/:productId").get(photo);

//getAll routes
router.route("/products").get(getAllProducts);
router.route("/productbycate").get(getProductsByCategory);

module.exports = router;
