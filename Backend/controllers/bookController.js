const Books = require("../Models/BooksModel");

exports.AddBook = async (req, res) => {
  try {
    const book = new Books(req.body);
    await book.save();
    res.status(201).send("Könyv hozzáadva");
  } catch (e) {
    res.status(400).send(e.message);
  }
};
exports.GetBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(201).send(books);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
exports.GetABook = async (req, res) => {
  try {
    const books = await Books.findById(req.params.id);
    res.status(201).send(books);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
