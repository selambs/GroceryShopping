const express = require("express");
const customerRouter = express.Router();

const { customerProtect } = require("../middleware/protect");

const {
  signupCustomer,
  signinCustomer,
  getAllFarmers,
  rateFarmer,
  addToCart,
  cart,
  deleteItemFromcart,
  clearCart,
  resetPassword,
  orderHistory,
} = require("../controller/customerController");

//send http request (post method) to create an acount for a customer before using the mobile app
customerRouter.post("/api/customer/signup", signupCustomer);

//send http request (post method) to login to customer acount to use the mobile app
customerRouter.post("/api/customer/signin", signinCustomer);

//get all farmers sorted by their reputations
customerRouter.get("/api/customer/farmers", customerProtect, getAllFarmers);

//rate farmer by id
customerRouter.post("/api/customer/farmers/:id", customerProtect, rateFarmer);

//add a product to cart
customerRouter.post("/api/customer/farmers", customerProtect, addToCart);

//display all item in customer cart
customerRouter.get("/api/customer", customerProtect, cart);

//remove a product from cart
customerRouter.delete("/api/customer/farmer/products/:prodId", customerProtect, deleteItemFromcart);

//clear cart after order is placed
customerRouter.post("/api/customer", customerProtect, clearCart);

//reset password
customerRouter.post(
  "/api/customer/resetpassword",
  customerProtect,
  resetPassword
);

//get order history
customerRouter.get("/api/customer/orderhistory", customerProtect, orderHistory);

module.exports = customerRouter;
