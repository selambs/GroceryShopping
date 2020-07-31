const Farmer = require("../model/farmerModel");
const Customer = require("../model/customerModel");

exports.authorize = (...role) => {
  return async (req, res, next) => {
    // console.log(req.user);
    if (role.includes(req.user.role)) {
      let user = await Farmer.findOne({ _id: req.user._id });
      req.user = user;
      next();
    } else {
      return res.json({ success: "failed", message: "You are not authorized" });
    }
  };
};

