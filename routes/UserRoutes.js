const express = require("express");
const userModel = require("../model/UserModel");
const formModel = require("../model/EnquiryForm")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    let { password } = req.body;
    try {
    bcrypt.hash(password, 3, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let user = new userModel(req.body);
      await user.save();
      res.status(201).send({ mess: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
      let user = await userModel.find({ email });
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, async (err, result) => {
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, process.env.secret); //,{ expiresIn:60*60}
            res.status(200).send({ mess: "Login Successful", Token: token });
          } else {
            res.status(401).send({ mess: "Wrong Credentials" });
          }
        });
      } else {
        res.status(404).send({ mess: "User Not Found" });
      }
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});



module.exports = userRouter;
