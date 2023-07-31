const express = require("express");
const router = express.Router();
const authService = require('../services/auth.service');

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const token = await authService.createToken(email, password);
    res.json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
