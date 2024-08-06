const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const bycrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).send({ message: "Nincs ilyen felhasználó" });
    }
    if (await bycrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "20m",
        }
      );
      return res.status(200).send({
        token: token,
        user: user,
      });
    } else {
      return res.status(400).send({ message: "Helytelen jelszó" });
    }
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
