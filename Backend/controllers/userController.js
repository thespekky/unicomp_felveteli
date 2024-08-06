const users = require("../Models/userModel");
const bycrypt = require("bcrypt");
exports.RegUser = async (req, res) => {
  try {
    const findUser = await users.findOne({ email: req.body.email });
    if (findUser !== null) {
      return res.status(400).send({ message: "Létező email cím" });
    }
    const hasshedPassword = await bycrypt.hash(req.body.password, 10);
    const userData = {
      email: req.body.email,
      password: hasshedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      admin: false,
      phonenumber: req.body.phonenumber,
    };
    const user = new users(userData);
    await user.save();
    res.status(201).send({ message: "Felhasználó létrehozva" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.GetUser = async (req, res) => {
  try {
    const findUser = await users.findOne({ email: req.user.email });
    if (findUser === null) {
      return res.status(400).send({ message: "Nem Létező email cím" });
    }
    res.status(200).send({ user: findUser, message: "Felhasználó megtalálva" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
