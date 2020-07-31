const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  companyname: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  logo: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: "farmer" },
  products: [
    {
      itemName: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      inventory: { type: Number, required: true },
      detail: { type: String, required: true },
    },
  ],
  active: { type: String, default: "Active" },
  rate: { type: Number, default: 1 },
});

module.exports = mongoose.model("farmer", farmerSchema);
