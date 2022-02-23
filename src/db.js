const mongoose = require('mongoose');

// Schema for 'Posts' Collection
const Posts = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    pages: Number,
});





mongoose.model('Posts', Posts);



mongoose.connect('mongodb://localhost/libraryProject');
