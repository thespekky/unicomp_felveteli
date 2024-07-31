const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
exports.auth = async (req, res, next) => {
  try {
    const authtoken = req.headers.authtoken
      ? req.headers.authtoken
      : req.headers.authorization.split(" ")[1];
    if (!authtoken) {
      return res.status(400).send({ message: "Nincs token" });
    }
    const data = jwt.verify(authtoken, process.env.ACCESS_TOKEN_KEY);
    if (!data) {
      return res.status(400).send({ message: "Nincs token" });
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(400).send({ message: "Nincs felhasználó" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
