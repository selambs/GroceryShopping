const express = require("express");
const superuserRoute = express.Router();

const { protect } = require("../middleware/protect");
const { authorize } = require("../middleware/authorization");

const {
  dashboard,
  resetPassword,
  activateAndDeactivateAccount,
  logfile,
} = require("../controller/superuserController");

//get all farmers and customers account
superuserRoute.get(
  "/api/superuser",
  protect,
  authorize("superuser"),
  dashboard
);

//reset password of farmer and customer
superuserRoute.put(
  "/api/superuser/user/:id",
  protect,
  authorize("superuser", "farmer"),
  resetPassword
);

//activate/deactivate acount of farmers and customers
superuserRoute.put(
  "/api/superuser/users/:id",
  protect,
  authorize("superuser"),
  activateAndDeactivateAccount
);

//get log file
superuserRoute.get(
  "/api/superuser/logfile",
  protect,
  authorize("superuser"),
  logfile
);

module.exports = superuserRoute;
