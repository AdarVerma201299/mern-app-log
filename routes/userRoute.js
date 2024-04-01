const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtScrect = "MynameisEndtoEndYouTubeChannel$#";

router.post(
  "/userRoute",
  [
    body("email").isEmail().escape(),
    body("password").isLength({ min: 6 }).escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser = await User.create({
        name: req.body.name,
        location: req.body.location,
        age: req.body.age,
        email: req.body.email,
        password: secpassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error", success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().escape(),
    body("password").isLength({ min: 6 }).escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ error: "try logging with correct email creadentails" });
      }
      const passcompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!passcompare) {
        return res
          .status(402)
          .json({ error: "try logging with correct password creadentails" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtScrect);
      return res.json({ success: true, authToken: authToken ,location:userData.location});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error", success: false });
    }
  }
);
module.exports = router;
