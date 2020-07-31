const Order = require("../model/orderlistModel");
const Customer = require("../model/customerModel");
const Farmer = require("../model/farmerModel");

const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");

//when customer place an order order list will be created
exports.placeOrder = async (req, res, next) => {
  try {
    let itemsInCart = await Customer.findOne({ _id: req.user.id });
    let farmerEmail = await Farmer.findOne({ _id: req.body.farmerId });

    const order = new Order({
      farmerId: req.body.farmerId,
      customerId: req.user.id,
      items: req.body.orders,
    });

    await order.save();

    req.body.orders.map(async (item) => {
      await Farmer.updateOne(
        {
          _id: ObjectId(req.body.farmerId),
          products: { $elemMatch: { _id: ObjectId(item.productId) } },
        },
        {
          $set: {
            "products.$.inventory": item.inventory - item.quantity,
          },
        }
      );
    });

    itemsInCart.cart = { totalPrice: 0, items: [] };
    await itemsInCart.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farmermarket404@gmail.com",
        pass: "selam@farmer",
      },
    });

    let mailOptions = {
      from: "farmermarket404@gmail.com",
      to: farmerEmail.email,
      cc: req.user.email,
      subject: "Order is Placed!",
      html: `<b>Hi,</b>
      <p>Once order is processed, additional detail email will be sent to customer.<br>
      item(s) : <br> ${req.body.orders.map((item) => {
        return (
          "Item Name" +
          item.itemName +
          " " +
          "Quantity" +
          item.quantity +
          " " +
          "Price $" +
          item.price +
          "<br>"
        );
      })}<br>
      Thank you for shopping!</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ status: "ok", messege: "Your order is placed!" });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.messege,
    });
  }
};

//farmer can see his/her own order list of all customers
exports.orderList = async (req, res, nex) => {
  try {
    let farmer = await Farmer.findOne({
      _id: ObjectId(req.user._id),
    });
    let order = await Order.find({ farmerId: ObjectId(farmer._id) });

    res.status(200).json({ status: "ok", orderList: order });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};

//farmer will update the order status when item is ready and picked up
exports.updatesStatus = async (req, res, next) => {
  let orderId = req.params.orderid;
  let orderStatus = req.body.orderStatus;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(Date.now()).toLocaleDateString(undefined, options);
  };

  //to get the customer email and farmer address.
  let order = await Order.find({ _id: orderId });

  try {
    await Order.updateOne(
      { _id: orderId },
      { $set: { orderStatus: orderStatus } }
    );
    if (orderStatus == "Ready") {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "farmermarket404@gmail.com",
          pass: "selam@farmer",
        },
      });
      let mailOptions = {
        from: "farmermarket404@gmail.com",
        to: order[0].customerEmail,
        subject: "Your order is ready to pick!",
        html: `<b>Dear Customer</b>
        <p>Your order is ready to pick by ${formatDate()}.<br>
        Pick your items from ${order[0].farmerAddress}.<br>
        Thank you for shopping!</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    res.status(200).json({
      status: "ok",
      messege: "Order Status Updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.messege,
    });
  }
};
