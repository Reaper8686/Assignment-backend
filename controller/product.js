const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");

//create
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentsions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Problem in image",
      });
    }
    //Validation on fields

    const {name, description, price, category, stock} = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        success: false,
        error: "Enter fields properly",
      });
    }

    //creating product object
    let product = new Product(fields);

    if (!file.photo) {
      return res.status(400).json({
        success: false,

        error: "photo is required",
      });
    }

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          success: false,

          error: "File size to big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving data to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Failed to save product",
        });
      }
      // console.log(product);
      res.status(200).json({
        success: true,
        product,
      });
    });
  });
};

exports.getProduct = (req, res) => {
  Product.findById(req.params.productId).exec((err, product) => {
    if (err || !product) {
      return res.status(404).json({
        success: false,
        error: "product not found",
      });
    }

    product.photo = undefined;

    res.status(200).json({
      success: true,
      product,
    });
  });
};

exports.photo = (req, res, next) => {
  Product.findById(req.params.productId).exec((err, product) => {
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  });
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .select("-photo")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "products NOT FOUND",
        });
      }
      res.status(200).json({
        success: true,
        products,
      });
    });
};

exports.getProductsByCategory = (req, res) => {
  Product.find({category: req.query.category})
    .select("-photo")
    .exec((err, products) => {
      if (err) {
        return res.status(404).json({
          success: false,
          error: "no products",
        });
      }
      res.status(200).json({
        success: true,
        products,
      });
    });
};
