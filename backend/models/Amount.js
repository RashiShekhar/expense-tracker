const mongoose = require("mongoose");

const AmtSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Amount", AmtSchema, "amt");
