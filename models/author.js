const mongoose = require("mongoose");

// create author schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);
