const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("product", ProductSchema);
