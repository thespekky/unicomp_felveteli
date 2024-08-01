const express = require("express");
const routes = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController.js");
const authController = require("../controllers/auth.Controller");

const authMiddleware = require("../Middlewares/auth.Middleware");

//felhasználó végpontok

routes.post("/users", userController.RegUser);
routes.post("/users/login", authController.login);
routes.get("/users/me", [authMiddleware.auth], userController.GetUser);

//könyvek végpontok

routes.post("/books", bookController.AddBook);
routes.get("/books", bookController.GetBooks);
routes.get("/books/:id", bookController.GetABook);
routes.patch("/books/:id", bookController.PatchABook);
routes.delete("/books/:id", bookController.DeleteABook);

module.exports = routes;
