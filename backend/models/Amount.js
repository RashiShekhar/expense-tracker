const mongoose = require("mongoose");

const amountSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Amount", amountSchema, "amt");
