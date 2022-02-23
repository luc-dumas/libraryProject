// Imports
const express = require('express');
const app = express(); //middleware
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db');
const mongoose = require('mongoose');
// const { insert } = require('ramda');
const Posts = mongoose.model('Posts');

// View Engine
app.set('view engine', 'hbs');





// Middleware

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true
}));

// Routing

const test = "";

app.get('/', (req, res) => {
    let title = req.query.search;
    if (title === "" || !title) {
        Posts.find(function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('home', { 'result': result })
            if (err) {
                console.log("Error")
            }
        })
    } else {
        Posts.find({ "title": title }, function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('home', { 'result': result })
            if (err) {
                console.log("Error")
            }
        })
    }
})

app.get('/deleteentry', (req, res) => {
    let title = req.query.delete;
    if (title === "" || !title) {
        Posts.find(function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);
            })
            res.render('deleteentry', { 'result': result });
            if (err) {
                console.log("Error")
            }
        })
    } else {
        Posts.deleteOne({ "title": title }, function (err, result) {
            res.redirect("/deleteentry");
            if (err) {
                console.log("Error")
            }
        })
    }
})




app.get('/search', (req, res) => {
    let title = req.query.search;
    if (title === "" || !title) {
        Posts.find(function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('search', { 'result': result })
            if (err) {
                console.log("Error")
            }
        })
    } else {
        Posts.find({ "title": title }, function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('search', { 'result': result })
            if (err) {
                console.log("Error")
            }
        })
    };
})
app.get('/register', (req, res) => {
    res.render('register', { 'test': test });
})


app.get('/addentry', (req, res) => {
    let title = req.query.search;
    if (title === "" || !title) {
        Posts.find(function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('addentry', { 'result': result })
            if (err) {
                console.log("Error")
            }
        })
    } else {
        Posts.find({ "title": title }, function (err, result) {
            result.map(function callback(value, err) {
                console.log(value.title);
                console.log(err);

            })
            res.render('addentry', { 'result': result })
            if (err) {
                console.log("Error")
            }
        })
    }
})


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
        const newBook = new Posts({
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

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000; // app to listen in local
}
app.listen(port);