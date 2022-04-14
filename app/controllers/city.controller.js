const City = require("../models/city.model.js");

// Create and Save a new City
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a City
  const city = new City({
    cityname: req.body.cityname,
  });

  // Save City in the database
  City.create(city, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the City.",
      });
    else res.send(data);
  });
};

// Retrieve all Cities from the database (with condition).
exports.findAll = (req, res) => {
  const cityname = req.query.cityname;

  City.getAll(cityname, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities.",
      });
    else res.send(data);
  });
};

// Find a single City by Id
exports.findOne = (req, res) => {
  City.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found City with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving City with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Cities
exports.findAllPublished = (req, res) => {
  City.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities.",
      });
    else res.send(data);
  });
};

// Update a City identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  City.updateById(req.params.id, new City(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found City with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating City with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a City with the specified id in the request
exports.delete = (req, res) => {
  City.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found City with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete City with id " + req.params.id,
        });
      }
    } else res.send({ message: `City was deleted successfully!` });
  });
};

// Delete all Cities from the database.
exports.deleteAll = (req, res) => {
  City.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cities.",
      });
    else res.send({ message: `All cities were deleted successfully!` });
  });
};
