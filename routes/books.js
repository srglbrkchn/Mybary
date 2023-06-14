const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const Author = require("../models/author");

// All books route
router.get("/", async (req, res) => {
  let query = Book.find();
  // filter query by title
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  // filter query by the publish date before the given date
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  // filter query by the publish date after the given date
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }

  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// Display new book route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

// Create new book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  });
  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newBook.id}`);
    res.redirect(`books`);
  } catch (err) {
    console.log(err);
    renderNewPage(res, book, true);
  }
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) params.errMessage = "Error creatig book.";
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
}

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  // get the unencoded cover turn it into a single json obj
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
}

module.exports = router;
