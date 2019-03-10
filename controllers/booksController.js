const db = require("../models");

module.exports = {
  findAll(req, res) {
    db.Books.find(req.query)
      .then(dbBooks => res.json(dbBooks))
      .catch(error => {
        console.log(error);
        res.json(error);
      });
  },
  findById(req, res) {
    db.Books.findById(req.params.id)
      .then(dbBooks => res.json(dbBooks))
      .catch(error => {
        console.log(error);
        res.json(error);
      })
  },
  saveBook(req, res) {
    db.Books.create(req.body)
      .then(dbBooks => res.json(dbBooks))
      .catch(error => {
        console.log(error);
        res.json(error);
      });
  },
  deleteBook(req, res) {
      db.Books.findById(req.params.id)
        .then(dbBook => dbBook.remove()) //to actually remove the book from db
        .then(dbBook => res.json(dbBook))
        .catch(error => {
          console.log(error);
          res.json(error);
        });
  }
  
};