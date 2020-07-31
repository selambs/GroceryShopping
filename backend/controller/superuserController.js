const Farmer = require("../model/farmerModel");
const Customer = require("../model/customerModel");
const fs = require("fs");

//dashboard for superuser to manage both customers and farmers accounts
exports.dashboard = async (req, res, next) => {
  try {
    let farmers = await Farmer.find({ role: "farmer" });
    let customers = await Customer.find();

    res.status(200).json({
      status: "ok",
      farmers: farmers,
      customers: customers,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//reset passwords of farmers and customers
exports.resetPassword = async (req, res, next) => {
  try {
    let user =
      (await Farmer.findOne({ _id: req.params.id })) ||
      (await Customer.findOne({ _id: req.params.id }));
    user.password = req.body.password;

    await user.save();

    res.status(200).json({
      status: "ok",
      messege: "Password Successfully Updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//activate/deactivate acounts of farmers and customers
exports.activateAndDeactivateAccount = async (req, res, next) => {
  try {
    let user =
      (await Farmer.findOne({ _id: req.params.id })) ||
      (await Customer.findOne({ _id: req.params.id }));

    user.active = req.body.active;
    await user.save();

    res.status(200).json({
      status: "ok",
      messege: "Active status changed",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//get log file of all requests
exports.logfile = async (req, res, next) => {
  try {
    let logfile = await fs.readFileSync("access.log", "utf8");
    let data = JSON.stringify(logfile).split("::1 - - ");

    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};
