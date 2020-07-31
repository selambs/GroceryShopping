const Customer = require("../model/customerModel");
const Farmer = require("../model/farmerModel");
const Order = require("../model/orderlistModel");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

//signup a customer account before using the mobile app
exports.signupCustomer = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let userEmail = await Customer.findOne({ email: email });
    if (!firstName || !lastName || !email || !password) {
      res.json({ status: "failed", messege: "You must fill all fields!" });
    }
    if (!userEmail) {
      const newUser = new Customer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      await newUser.save();
      res.json({ status: "ok", messege: "User registered" });
    } else {
      res.json({
        status: "failed",
        messege: "Email already exist, Please try a with a different email",
      });
    }
  } catch (err) {
    res.status(500).json({ messege: "Error found...", error: err.messege });
  }
};

//signin to customer account and jwt used for authentication purpose and password is encrypted
exports.signinCustomer = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await Customer.findOne({ email: email, password: password });

  try {
    if (!email || !password) {
      return res.json({
        status: "failed",
        messege: "Please enter your email and password",
      });
    }

    if (!user || password != user.password) {
      return res.json({
        status: "failed",
        messege: " Please enter a correct email or password",
      });
    }

    if (user) {
      if (user["active"] == "Active") {
        let token = jwt.sign(
          { id: user._id },
          "I am a customer, I like buying from this farmers!!!"
        );
        res.status(200).json({
          status: "ok",
          successMssege: "signed in",
          token: token,
          userInformation: user,
        });
      } else {
        res.status(200).json({
          status: "failed",
          messege: "No user account Found!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

exports.resetPassword = async () => {
  try {
    await Customer.updateOne(
      {
        _id: ObjectId(req.user.id),
      },
      {
        $set: {
          password: req.body.newPassword,
        },
      }
    );

    res
      .status(200)
      .json({ status: "ok", messege: "Password successfully changed!" });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//browse all farmers sorted by rank(eputation)
exports.getAllFarmers = async (req, res, next) => {
  try {
    let farmers = await Farmer.find({ role: "farmer", active: "Active" });
    let sortedByRate = farmers.sort((a, b) => b.rate - a.rate);
    res.status(200).json({ status: "ok", farmers: sortedByRate });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//rate farmer and the company's products
exports.rateFarmer = async (req, res, next) => {
  //id should be modified
  let id = req.params.id;
  let customerRate = req.body.rate;
  try {
    let farmer = await Farmer.findOne({
      _id: ObjectId(id),
    });

    if (customerRate == "Excellent") {
      farmer.rate += 1;
    } else if (customerRate == "Bad") {
      farmer.rate -= 1;
    } else if (customerRate == "Good") {
      farmer.rate += 0;
    }

    await farmer.save();

    res.status(200).json({ status: "ok", messege: "Rate updated" });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.messege,
    });
  }
};

//customer adds selected farmer product to his/her cart to request an order
exports.addToCart = async (req, res, next) => {
  try {
    let shoppingcart = await Customer.findOne({
      _id: ObjectId(req.user.id),
    });

    const isExisting = shoppingcart.cart.items.findIndex((item) => {
      return (
        new String(item.productId).trim() == new String(req.body._id).trim()
      );
    });

    if (isExisting >= 0) {
      shoppingcart.cart.items[isExisting].quantity += 1;
    } else {
      shoppingcart.cart.items.push({
        productId: req.body._id,
        itemName: req.body.itemName,
        image: req.body.image,
        detail: req.body.detail,
        price: req.body.price,
        inventory: req.body.inventory,
      });
    }
    if (!shoppingcart.cart.totalPrice) {
      shoppingcart.cart.totalPrice = 0;
    }
    shoppingcart.cart.totalPrice += req.body.price;

    let itemsInCart = await shoppingcart.save();

    res.status(201).json({
      status: "ok",
      messege: "Item successfully added to cart",
      itemsInCart: itemsInCart.cart,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.messege,
    });
  }
};

//items in customer's cart
exports.cart = async (req, res, next) => {
  let itemsInCart = req.user.cart;
  res.status(200).json({ status: "ok", itemsInCart: itemsInCart });
};

//customer removes selected farmer product from his/her cart
exports.deleteItemFromcart = async (req, res, next) => {
  try {
    let itemsInCart = await Customer.findOne({ cart: req.user.cart });
    itemsInCart.cart.items.filter((it) => {
      if (it.productId == req.params.prodId) {
        if (it.quantity !== 0) {
          it.quantity -= 1;
          itemsInCart.cart.totalPrice -= it.price;
        }
      }
    });

    await itemsInCart.save();
    res
      .status(200)
      .json({ status: "ok", messege: "Item is removed from cart" });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.messege,
    });
  }
};

//clear cart after order is placed
exports.clearCart = async (req, res, next) => {
  try {
    let itemsInCart = await Customer.findOne({ cart: req.user.cart });

    itemsInCart.cart = { totalPrice: 0, items: [] };

    await itemsInCart.save();
    res.status(200).json({ status: "ok", messege: "Cart is empty" });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//get order history and sort by date and status
exports.orderHistory = async (req, res, next) => {
  try {
    let orders = await Order.find({ customerId: req.user.id });
    let sortedByTime = orders.sort((a, b) => b.time - a.time);

    res.status(200).json({ status: "ok", data: sortedByTime });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};
