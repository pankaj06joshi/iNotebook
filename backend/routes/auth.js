const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_secret = "pankajhaveinfiniteenergy";

// Create a User using: POST "/api/auth/createuser" Dosen't require Auth (No Login required)
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "password must be atleast 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check weather the user already have email...
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: " A user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data,jwt_secret,)

      console.log(authToken);

      res.status(200).json({authToken});
    } catch (error) {
      console.log(`error is: ${error.message}`);
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
