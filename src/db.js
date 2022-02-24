const { application } = require('express');
const mongoose = require('mongoose');

// Schema for 'Posts' Collection
const Books = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    pages: Number,
});





mongoose.model('books', Books);



mongoose.connect('mongodb+srv://lucdumas007:brandonborden@cluster0.msigl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')