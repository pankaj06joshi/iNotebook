const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const jwt_secret = "pankajhaveinfiniteenergy";

//! Route: 1
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

      const authToken = jwt.sign(data, jwt_secret);

      console.log(authToken);

      res.status(200).json({ authToken });
    } catch (error) {
      console.log(`error is: ${error.message}`);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

//! Route: 2
// Authenticate a user using: POST "/api/auth/login" (No Login required)

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "Wrong Login Credentials",
        });
      }

      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res.status(400).json({
          error: "Wrong Login Credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwt_secret);
      res.status(200).json({ authToken });
    } catch (error) {
      console.log(`error is: ${error.message}`);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

//! Route: 3
// Get Loggedin user deatils using POST "/api/auth/getuser". Login Required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findOne({ userid }).select("-password");
    res.status(200).send(user);
  } catch (error) {
    console.log(`error is: ${error.message}`);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
