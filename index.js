const express = require("express");
require("dotenv").config();
const Connection = require("./config/db");
const userRouter = require("./routes/UserRoutes");
const formRouter = require("./routes/EnquiryFormRouter");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/form", formRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});



app.listen(process.env.port, async () => {
  try {
    await Connection;
  } catch (error) {
    console.log("Error while connecting to DB");
  }
  console.log("server is listening on " + process.env.port);
});
