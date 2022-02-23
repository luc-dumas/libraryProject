const { application } = require('express');
const mongoose = require('mongoose');

// Schema for 'Posts' Collection
const Posts = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    pages: Number,
});





mongoose.model('Posts', Posts);



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/libraryProject');

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('libraryProject/src'));
// }
