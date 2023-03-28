const Book = require("../models/book.model.ts");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Tutorial in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a Book."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
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

// Find a single Tutorial by Id
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

// find all published Tutorials
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

// Update a Tutorial identified by the id in the request
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

// Delete a Tutorial with the specified id in the request
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

// Delete all Tutorials from the database.
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