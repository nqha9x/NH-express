const { authJwt } = require("../middlewares");
const controller = require("../controllers/city.controller");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
// };

module.exports = (app) => {
  const cities = require("../controllers/city.controller.js");

  var router = require("express").Router();

  // Create a new City
  // To do this, you have to have a token
  router.post("/", verifyToken, cities.create);

  // Retrieve all cities
  // public content, so you don't need any token
  router.get("/", cities.findAll);

  // Retrieve a single City with id
  // To do this, you have to have a token
  router.get("/:id", verifyToken, cities.findOne);

  // Update a City with id
  // To do this, you have to have a token
  router.put("/:id", verifyToken, cities.update);

  // Delete a City with id
  // To do this, you have to have a token
  router.delete("/:id", verifyToken, cities.delete);

  // Delete all cities
  // To do this, you have to have a token
  router.delete("/", verifyToken, cities.deleteAll);

  app.use("/api/cities", router);
};
