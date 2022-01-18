const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    address: String,
    city: String,
    state: String,
    pincode: Number,
    status: {
      type: String,
      default: "Shipping",
    },
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);
