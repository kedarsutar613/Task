const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  tags: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.index();

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
