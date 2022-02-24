// Imports
const express = require("express");

const app = express(); // middleware
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./db");
// const { insert } = require('ramda');

const Books = mongoose.model("books");

// View Engine

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "add session secret here!",
    resave: false,
    saveUninitialized: true,
  })
);

// Routing

const test = "";

app.get("/", (req, res) => {
  const title = req.query.search;
  if (title === "" || !title) {
    Books.find((err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("home", { result });
      if (err) {
        console.log("Error");
      }
    });
  } else {
    Books.find({ title }, (err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("home", { result });
      if (err) {
        console.log("Error");
      }
    });
  }
});

app.get("/deleteentry", (req, res) => {
  const title = req.query.delete;
  if (title === "" || !title) {
    Books.find((err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("deleteentry", { result });
      if (err) {
        console.log("Error");
      }
    });
  } else {
    Books.deleteOne({ title }, (err, result) => {
      res.redirect("/deleteentry");
      if (err) {
        console.log("Error");
      }
    });
  }
});

app.get("/search", (req, res) => {
  const title = req.query.search;
  if (title === "" || !title) {
    Books.find((err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("search", { result });
      if (err) {
        console.log("Error");
      }
    });
  } else {
    Books.find({ title }, (err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("search", { result });
      if (err) {
        console.log("Error");
      }
    });
  }
});
app.get("/register", (req, res) => {
  res.render("register", { test });
});

app.get("/addentry", (req, res) => {
  const title = req.query.search;
  if (title === "" || !title) {
    Books.find((err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("addentry", { result });
      if (err) {
        console.log("Error");
      }
    });
  } else {
    Books.find({ title }, (err, result) => {
      result.map((value, err) => {
        console.log(value.title);
        console.log(err);
      });
      res.render("addentry", { result });
      if (err) {
        console.log("Error");
      }
    });
  }
});

app.post("/addentry", (req, res) => {
  insert(
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.pages,
    (error) => {
      errorMsg = error.message;
      res.render("addentry", {
        errorMsg,
      });
    },
    (success) => {
      console.log(success);
      console.log("success");
      res.redirect("/addentry");
    }
  );
  function insert(title, author, genre, pages, errorCallback, successCallback) {
    const newBook = new Books({
      title,
      author,
      genre,
      pages,
    });
    newBook.save((err, result) => {
      if (err) {
        errorCallback({
          message: "Please input a numerical value for the number of pages.",
        });
      }
      if (result) {
        successCallback(result);
      }
    });
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000; // app to listen in local
}
app.listen(port);
