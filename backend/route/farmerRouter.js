const express = require("express");
const farmerRouter = express.Router();

const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const { protect } = require("../middleware/protect");
const { authorize } = require("../middleware/authorization");

const {
  signupFramer,
  signinFarmer,
  addProducts,
  getProducts,
  deleteProduct,
  editProduct,
  resetPassword,
  forgetPassword,
} = require("../controller/farmerController");

//send http request (post method) to create an acount for a farmer before using the web app
farmerRouter.post("/api/farmer/signup", multer().single("logo"), signupFramer);

//send http request (post method) to login to farmer acount to use the web app
farmerRouter.post("/api/farmer/signin", signinFarmer);

//send http request (post method) to add a product by the farmer
farmerRouter.post(
  "/api/farmer/product",
  protect,
  authorize("farmer"),
  multer().single("productImage"),
  addProducts
);

//send http request (post method) to add a product by the farmer
farmerRouter.get(
  "/api/farmer/product",
  protect,
  authorize("farmer"),
  getProducts
);

//send http request (delete method) to delete a product by the farmer
farmerRouter.delete(
  "/api/farmer/product/:id",
  protect,
  authorize("farmer"),
  deleteProduct
);

//send http request (put method) to delete a product by the farmer
farmerRouter.put(
  "/api/farmer/product/:id",
  protect,
  authorize("farmer"),
  editProduct
);

//reset password
farmerRouter.put(
  "/api/farmer/resetpassword",
  protect,
  authorize("farmer"),
  resetPassword
);

//forget password and create a new password
farmerRouter.put("/api/forgetpassword", forgetPassword);

module.exports = farmerRouter;
