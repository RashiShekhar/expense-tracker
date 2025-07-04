const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Amount = require("../models/Amount");

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
router.post("/dashboard", async (req, res) => {
  const { amount } = req.body;
  console.log("Received amount:", amount);

  if (amount === undefined || isNaN(amount)) {
    return res.status(400).json({ message: "Valid amount is required" });
  }

  try {
    const newEntry = new Amount({ amount: Number(amount) });
    await newEntry.save();

    console.log("Amount saved:", newEntry);
    res.status(201).json({
      message: "Amount saved successfully",
      data: newEntry,
    });
  } catch (err) {
    console.error("MongoDB insert error:", err);
    res.status(500).json({ message: "Server error while saving amount" });
  }
});

module.exports = router;
