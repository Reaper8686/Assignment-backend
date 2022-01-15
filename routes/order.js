const express = require("express");
const router = express.Router();

const {createOrder, getOrderByUser} = require("../controller/order");

router.route("/order/create").post(createOrder);

router.route("/order/:userId").get(getOrderByUser);

module.exports = router;
