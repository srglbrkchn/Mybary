const express = require("express");
const Book = require("../models/book");
const Author = require("../models/author");
const router = express.Router();

// All books route
router.get("/", async (req, res) => {
  res.send("All Books");
});

// Display new book route
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/new", {
      authors: authors,
      book: book,
    });
  } catch {
    res.redirect("/books");
  }
});

// Create new book
router.post("/", async (req, res) => {
  res.send("create book");
});

module.exports = router;
