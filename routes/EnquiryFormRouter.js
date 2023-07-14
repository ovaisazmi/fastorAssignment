const express = require("express");
const formModel = require("../model/EnquiryForm");
const authenticator = require("../middleware/authenticator");

const formRouter = express.Router();

formRouter.post("/submit", async (req, res) => {
  try {
    let form = new formModel(req.body);
    await form.save();
    res.status(201).send({ mess: "Form submitted successfully" });
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

formRouter.patch("/user/claim", authenticator, async (req, res) => {
  try {
    let id = req.query.id;
    let form = await formModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ mess: "Form assigned to you" });
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

formRouter.get("/public", authenticator, async (req, res) => {
  try {
    let forms = await formModel.find({ assignedTo: null });
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

formRouter.get("/private", authenticator, async (req, res) => {
  try {
    let id = req.body.userID;
    let forms = await formModel.find({ assignedTo: id });
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

module.exports = formRouter;
