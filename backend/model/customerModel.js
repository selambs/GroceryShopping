const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // image: { type: String, required: true },
  role: { type: String, default: "customer" },
  active: { type: String, default: "Active" },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "farmer",
          required: true,
        },
        itemName: { type: String, ref: "farmer", required: true },
        image: { type: String, ref: "farmer", required: true },
        detail: { type: String, ref: "farmer", required: true },
        price: { type: Number, ref: "farmer", required: true },
        inventory: { type: Number, ref: "farmer", required: true },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("customer", customerSchema);
