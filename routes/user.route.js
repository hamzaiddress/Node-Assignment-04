const express = require("express");
const router = express.Router();
const userService = require('../services/user.service');
const validateEmail = require('../middlewear/dublicate.email');
const auth = require('../middlewear/jwt.middlewear');
// get all products
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create user and validate dublicate email
router.post("/", validateEmail.checkDublicateEmail, async (req, res) => {
  try {
    const { name, email, password, age, isAdmin } = req.body;
    const savedUser = await userService.createUser({
      name,
      email,
      password,
      age,
      isAdmin
    });
   res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete user api
router.delete("/:id", auth.verifyToken, async (req, res) => {
  const id = req.params.id;
  await userService.deleteUser(id, res);
  res.send("User deleted");
});

// patch/update user api
router.patch("/:id", auth.verifyToken, async (req, res) => {
  const userId = req.params.id;
  const updatedFields = req.body;
  const updatedUser = await userService.patchUser(userId, updatedFields, res);
  res.send(updatedUser);
});

module.exports = router;
