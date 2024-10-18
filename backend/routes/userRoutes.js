const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

// Define routes and map them to controller functions

router.post(
  "/reg",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
    check("gender", "Gender is required").not().isEmpty(),
  ],
  createUser
);

router.post("/login", loginUser);

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
