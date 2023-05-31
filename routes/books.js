const express = require("express");
const Book = require("../models/book");
const router = express.Router();

// All books route
router.get("/", async (req, res) => {});

// Display new book route
router.get("/new", (req, res) => {});

// Create new book
router.post("/", async (req, res) => {});

module.exports = router;
