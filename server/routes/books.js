// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    res.render("books/details",{
      title: 'Add Book',
      books: {
        Title: "",
        Price : "",
        Author : "",
        Genre: ""
      }
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

  var newBook = new book({
    Title: req.body["title"],
    Price : req.body["price"],
    Author : req.body["author"],
    Genre: req.body["genre"]
  });

  newBook.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     book.findById(req.params["id"].replace("$","")).exec(function (err, book) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(book);
        res.render("books/details",{
          title: 'View/Edit Book',
          books: {
            Title: book.Title,
            Price : book.Price,
            Author : book.Author,
            Genre: book.Genre
          }
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     book.findByIdAndUpdate(req.params["id"].replace("$",""), { $set: { Title: req.body.title, Author: req.body.author, Price: req.body.price, Genre: req.body.genre }}, { new: true }, function (err, book) {
      if (err) {
        console.log(err);
      }
      res.redirect("/books");
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    book.remove({_id: req.params["id"].replace("$","")}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        res.redirect("/books");
      }
    });
});


module.exports = router;
