const express = require("express");
const orderRouter = express.Router();

const { protect, customerProtect } = require("../middleware/protect");
const { authorize } = require("../middleware/authorization");

const {
  placeOrder,
  orderList,
  updatesStatus,
} = require("../controller/orderController");

//send http request (post method) to place order
orderRouter.post("/api/customer/order", customerProtect, placeOrder);

//farmer can see all the orders in his/her account
orderRouter.get("/api/farmer/orders", protect, authorize("farmer"), orderList);

//farmer will update the order status when item is ready and picked up
orderRouter.put(
  "/api/farmer/orders/:orderid",
  protect,
  authorize("farmer"),
  updatesStatus
);

module.exports = orderRouter;
