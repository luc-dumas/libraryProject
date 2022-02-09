const mongoose = require('mongoose');

// Schema for 'Posts' Collection
const Posts = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    pages: Number,
});

// Schema for 'Users' Collection

// const Users = new mongoose.schema({
//     username: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         minlength: 8,
//         required: true
//     }

// });



mongoose.model('Posts', Posts);
// mongoose.model('users', Users);

//connection ... we'll connect it locally for now
mongoose.connect('mongodb://localhost/libraryProject');
