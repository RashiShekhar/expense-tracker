const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Amount = require("../models/Amount");
const Data = require("../models/Data");

// Signup
router.post("/signup", async (req, res) => {
  console.log("Request body:", req.body);
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

//dashboard
// routes/dashboard.js or wherever your route is
router.post("/dashboard", async (req, res) => {
  const { amount, item } = req.body;
  console.log("Received:", { amount, item });

  if (
    amount === undefined ||
    isNaN(amount) ||
    !item ||
    typeof item !== "string" ||
    item.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "Valid amount and item name are required" });
  }

  try {
    const newEntry = new Amount({
      amount: Number(amount),
      item: item.trim(),
    });

    await newEntry.save();

    res.status(201).json({
      message: "Amount and item saved successfully",
      data: newEntry,
    });
  } catch (err) {
    console.error("MongoDB insert error:", err);
    res.status(500).json({ message: "Server error while saving entry" });
  }
});

//data
router.post("/total", async (req, res) => {
  const { total } = req.body;

  if (total === undefined || isNaN(total)) {
    return res.status(400).json({ message: "Total must be a valid number" });
  }

  try {
    const newTotal = new Data({ total });
    await newTotal.save();
    res.status(201).json({ message: "Total saved", data: newTotal });
  } catch (err) {
    console.error("Error saving total:", err);
    res.status(500).json({ message: "Failed to save total" });
  }
});

router.get("/total", async (req, res) => {
  try {
    const allTotals = await Data.find().sort({ createdAt: -1 }); // Most recent first
    res.status(200).json({ data: allTotals });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch totals" });
  }
});

module.exports = router;
