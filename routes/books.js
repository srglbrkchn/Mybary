const express = require("express");
const Book = require("../models/book");
const router = express.Router();

// All books route
router.get("/", async (req, res) => {
  res.send("All Books");
});

// Display new book route
router.get("/new", (req, res) => {
  res.send("New book");
});

// Create new book
router.post("/", async (req, res) => {
  res.send("create book");
});

module.exports = router;
