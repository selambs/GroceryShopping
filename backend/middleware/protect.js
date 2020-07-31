const Farmer = require("../model/farmerModel");
const jwt = require("jsonwebtoken");
const Customer = require("../model/customerModel");


exports.protect = async (req, res, next) => {
  //   console.log(req.rawHeaders[1]);
  let token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", messege: "You are not authorized user" });
  }

  try {
    let verifiedUser = jwt.verify(token, "I am strong, I can do it!!!");
    let user = await Farmer.findOne({ _id: verifiedUser.id });
    if (!user) {
      return res.status(200).json({
        status: "failed",
        messege: "Please enter your email and password",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

exports.customerProtect = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(401)
      .json({ status: "failed", messege: "You are not authorized user" });
  }

  let token = req.headers["authorization"].split(" ")[1];

  try {
    let verifiedUser = jwt.verify(
      token,
      "I am a customer, I like buying from this farmers!!!"
    );
    let user = await Customer.findOne({ _id: verifiedUser.id });
    if (!user) {
      return res.status(200).json({
        status: "failed",
        messege: "Please enter your email and password",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
