const Book = require("../models/book.model.ts");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a Book."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Book.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Book.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Book with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Book.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Book.updateById(
    req.params.id,
    new Book(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Book with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Book.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Book with id " + req.params.id
        });
      }
    } else res.send({ message: `Book was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Book.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Books."
      });
    else res.send({ message: `All Books were deleted successfully!` });
  });
};