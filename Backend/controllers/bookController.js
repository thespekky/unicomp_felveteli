const Books = require("../Models/BooksModel");
const mongoose = require("mongoose");

exports.AddBook = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const book = new Books(req.body);
      return book.save({ session: session });
    });
    session.endSession();
    res.status(201).send({ message: "Könyv hozzáadva" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.GetBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(200).send({ books: books });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.GetABook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    res.status(200).send({ book: book });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.PatchABook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (book === null) {
      return res.status(400).send({ message: "Nincs ilyen könyv" });
    }
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      return Books.findByIdAndUpdate(req.params.id, req.body, {
        session: session,
      });
    });
    session.endSession();
    res.status(200).send({ message: "Könyv frissitve" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
exports.DeleteABook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (book === null) {
      return res.status(400).send({ message: "Nincs ilyen könyv" });
    }
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      return await Books.findByIdAndDelete(req.params.id, {
        session: session,
      });
    });
    session.endSession();
    res.status(200).send({ message: "Könyv törölve" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
