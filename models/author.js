const mongoose = require("mongoose");
const Book = require("./book");

// create author schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    const books = await Book.find({ author: this.id });
    if (books.length > 0) {
      throw new Error("This author has books still");
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Author", authorSchema);
