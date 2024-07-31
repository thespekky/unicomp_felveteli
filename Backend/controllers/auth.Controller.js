const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    if (!user) {
      return res.status(400).send({ message: "Nincs ilyen felhasználó" });
    }
    const token = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "20m",
      }
    );
    return res.status(201).send({
      token: token,
      user: user,
    });
  } catch (e) {
    return res.status(400).send({ message: "Hiba" });
  }
};
