const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", DataSchema, "data");
