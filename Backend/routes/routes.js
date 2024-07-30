const express = require("express");
const routes = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController.js");

//felhasználó végpontok

routes.post("/users", userController.RegUser);

//könyvek végpontok

routes.post("/books", bookController.AddBook);
routes.get("/books", bookController.GetBooks);
routes.get("/books/:id", bookController.GetABook);

module.exports = routes;
