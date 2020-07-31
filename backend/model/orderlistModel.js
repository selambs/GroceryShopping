const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderListSchema = new Schema({
  farmerId: { type: mongoose.Types.ObjectId, ref: "farmer", require: true },
  customerId: { type: mongoose.Types.ObjectId, ref: "customer", require: true },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        //create relational db and references
        ref: "customer",
        required: true,
      },
      itemName: { type: String, ref: "customer", required: true },
      image: { type: String, ref: "customer", required: true },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  orderStatus: { type: String, default: "Pending" },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("orderList", orderListSchema);
