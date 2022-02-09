// Imports
const express = require('express');
const app = express(); //middleware
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db');
const mongoose = require('mongoose');
const { insert } = require('ramda');
const Books = mongoose.model('books');

// View Engine
app.set('view engine', 'hbs');

// Middleware

// joins some folders/directories
app.use(express.static(path.join(__dirname, 'public')));

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: false }));


// What is the exact use of this middleware? I know it is something to do with a way to store user data between HTTP requests.. I believe this helps us access req.body
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true
}));

// Routing

const test = "";

// What is in these curly brackets below? { 'test': test} and why does it need to be stored in a variable?
app.get('/', (req, res) => {
    res.render('home', { 'test': test });
})
// app.get('/addentry', (req, res) => {
//     res.render('addentry', { 'test': test });
// })
app.get('/deleteentry', (req, res) => {
    res.render('deleteentry', { 'test': test });
})
app.get('/search', (req, res) => {
    res.render('search', { 'test': test });
})
app.get('/register', (req, res) => {
    res.render('register', { 'test': test });
})

// Search
// app.get('/addentry', (req, res) => {
// })



app.get('/addentry', (req, res) => {
    let title = req.query.search;
    if (title === "" || !title) {
        Books.find(function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('addentry', { 'result': result })
            if (err) {
                console.log("SOMETHING BAD HAPPENED")
            }
        })
    } else {
        Books.find({ "title": title }, function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('addentry', { 'result': result })
            if (err) {
                console.log("SOMETHING BAD HAPPENED")
            }
        })
    }
})

// Adding entries to the library
app.post('/addentry', (req, res) => {
    insert(req.body.title, req.body.author, req.body.genre, req.body.pages,
        (error) => {
            errorMsg = error.message;
            res.render('addentry', {
                'errorMsg': errorMsg
            });
        },
        (success) => {
            console.log(success);
            console.log('success');
            res.redirect('/addentry');
        })
    function insert(title, author, genre, pages, errorCallback, successCallback) {
        const newBook = new Books({
            title: title,
            author: author,
            genre: genre,
            pages: pages
        });
        newBook.save(function (err, result) {
            if (err) {
                errorCallback({ message: "Please input a numerical value for the number of pages." });
            } if (result) {
                successCallback(result);
            }
        })

    }
})





const port = 5000;
app.listen(port);