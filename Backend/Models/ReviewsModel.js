const { default: mongoose } = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  bookid: { type: String, required: true },
  userid: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: String, required: true },
});

module.exports = mongoose.model("reviews", reviewsSchema);
