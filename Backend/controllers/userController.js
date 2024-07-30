const users = require("../Models/userModel");
exports.RegUser = async (req, res) => {
  try {
    const findUser = await users.findOne({ email: req.body.email });
    if (findUser !== null) {
      return res.status(400).send("Létező email cím");
    }
    const user = new users(req.body);
    await user.save();
    res.status(201).send("Felhasználó létrehozva");
  } catch (e) {
    res.status(400).send(e.message);
  }
};
