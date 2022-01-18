const Order = require("../models/order");

exports.createOrder = (req, res) => {
  const {addresss, state, city, pincode, products} = req.body;

  if (addresss || !state || !city || !pincode || !products) {
    return res.status(400).json({
      success: false,
      message: "fill fields properly",
    });
  }

  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Failed to save order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  });
};

exports.getOrderByUser = (req, res) => {
  Order.find({user: req.params.userId})
    .populate("products.product", "name price")
    .exec((err, orders) => {
      console.log(err);
      if (err) {
        return res.status(400).json({
          success: false,
          message: "order not found",
        });
      }

      res.status(200).json({
        success: true,
        orders,
      });
    });
};
