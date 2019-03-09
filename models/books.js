const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define book schema
// title author, description, image, link, date, bookId
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: Array,
  description: String,
  image: String,
  link: String,
  date: String,
  bookId: String
});

// create modal using mongoose and the schema that was just created
const Book = mongoose.Model("Books", BookSchema);

module.exports = Books;