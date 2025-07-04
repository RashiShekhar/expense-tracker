const mongoose = require("mongoose");

const AmtSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Amount", AmtSchema, "amt");
