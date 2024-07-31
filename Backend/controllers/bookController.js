const Books = require("../Models/BooksModel");
const mongoose = require("mongoose");

exports.AddBook = async (req, res) => {
  try {
    await mongoose.connection.transaction(async (session) => {
      const book = new Books(req.body);
      await book.save({ session });
      return book;
    });
    res.status(201).send({ message: "Könyv hozzáadva" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.GetBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(201).send({ books: books });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.GetABook = async (req, res) => {
  try {
    const books = await Books.findById(req.params.id);
    res.status(201).send({ books: books });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
