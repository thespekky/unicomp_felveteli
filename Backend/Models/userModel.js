const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  admin: { type: Boolean, required: true },
  phonenumber: { type: String },
});

module.exports = mongoose.model("users", userSchema);
