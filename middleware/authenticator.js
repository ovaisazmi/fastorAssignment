const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({"mess":"Please Login"});
      } else {
        req.body.userID = decoded.userID;
        next();
      }
    });
  } else {
    res.status(404).send({"mess":"Please Login first"});
  }
};
module.exports = authenticator;
