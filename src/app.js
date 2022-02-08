// Imports
const express = require('express');
const app = express(); //middleware
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db');
const mongoose = require('mongoose');
const Books = mongoose.model('books');

// View Engine
app.set('view engine', 'hbs');

// Middleware

// joins some folders/directories
app.use(express.static(path.join(__dirname, 'public')));

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: false }));


// What is the exact use of this middleware? I know it is something to do with a way to store user data between HTTP requests
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
app.get('/addentry', (req, res) => {
    res.render('addentry', { 'test': test });
})
app.get('/deleteentry', (req, res) => {
    res.render('deleteentry', { 'test': test });
})
app.get('/search', (req, res) => {
    res.render('search', { 'test': test });
})
app.get('/register', (req, res) => {
    res.render('register', { 'test': test });
})







const port = 5000;
app.listen(port);