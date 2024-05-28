const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Book = require('../models/BookModel');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.registerUser = asyncHandler(async (req, res) => {
  const { password, email, name, userType } = req.body;

  try {
    const newUser = new User({
      email,
      password,
      name,
      userType,
    });

    const user = await newUser.save();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "User registered successfully", user, token });
  } catch (err) {
    res.status(500).json({ message: "Failed to register user", error: err.message });
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (err) {
    res.status(500).json({ message: "Failed to log in", error: err.message });
  }
});

exports.addBook = asyncHandler(async (req, res) => {
  const { cover, title, description, price, tags, genre, publishDate } = req.body;

  try {
    const newBook = new Book({
      title,
      description,
      price,
      tags,
      genre,
      publishDate
    });

    const book = await newBook.save();

    res.status(200).json({ message: "Book added successfully", book});
  } catch (err) {
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
});

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signout successfully" });
};
