const reviews = require("../Models/ReviewsModel");
const books = require("../Models/BooksModel");
const mongoose = require("mongoose");

exports.AddReview = async (req, res) => {
  try {
    if (req.params.bookid !== req.body.bookid) {
      return res.status(400).send({ message: "Bookid hiba" });
    }
    if (req.body.rating > 5 || req.body.rating < 0) {
      return res.status(400).send({ message: "Helytelen értékelés" });
    }
    const book = await books.findById(req.params.bookid);
    if (book === null) {
      return res.status(400).send({ message: "Nincs ilyen könyv" });
    }
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const review = new reviews(req.body);
      return review.save({ session: session });
    });
    session.endSession();
    res.status(201).send({ message: "Hozzáadva" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.GetReviews = async (req, res) => {
  try {
    const allReviews = await reviews.find({ bookid: req.params.bookid });
    res.status(200).send({ allReviews: allReviews });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.PatchReview = async (req, res) => {
  try {
    if (req.user.email != req.body.user.email) {
      return res.status(400).send({ message: "Rossz felhasználó" });
    }
    const review = await reviews.findById(req.params.id);
    if (review === null) {
      return res.status(400).send({ message: "Nincs ilyen review" });
    }
    if (req.body.user.rating > 5 || req.body.user.rating < 0) {
      return res.status(400).send({ message: "Helytelen értékelés" });
    }
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      return reviews.findByIdAndUpdate(req.params.id, req.body.review, {
        session: session,
      });
    });
    session.endSession();
    res.status(200).send({ message: "sikeres frissítés" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.DeleteReview = async (req, res) => {
  try {
    if (req.user.email != req.body.email) {
      return res.status(400).send({ message: "Rossz felhasználó" });
    }
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      return reviews.findByIdAndDelete(req.params.id, {
        session: session,
      });
    });
    session.endSession();
    res.status(200).send({ message: "Sikeres törlés" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
