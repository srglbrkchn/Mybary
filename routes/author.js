const express = require("express");
const router = express.Router();

// All authors route
router.get("/", (req, res) => {
  res.render("authors/index");
});

// Display new author route
router.get("/new", (req, res) => {
  res.render("authors/new");
});

// Create new author
router.post("/", (req, res) => {
  res.send("create");
});

module.exports = router;
