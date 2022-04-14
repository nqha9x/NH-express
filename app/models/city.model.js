const sql = require("./db.js");

// constructor
const City = function (city) {
  this.cityname = city.cityname;
};

City.create = (newCity, result) => {
  sql.query("INSERT INTO cities SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created city: ", { id: res.insertId, ...newCity });
    result(null, { id: res.insertId, ...newCity });
  });
};

City.findById = (id, result) => {
  sql.query(`SELECT * FROM cities WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found city: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

City.getAll = (cityname, result) => {
  let query = "SELECT * FROM cities";

  if (cityname) {
    query += ` WHERE cityname LIKE '%${cityname}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cities: ", res);
    result(null, res);
  });
};

City.updateById = (id, city, result) => {
  sql.query(
    "UPDATE cities SET cityname = ?  WHERE id = ?",
    [city.cityname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found City with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated city: ", { id: id, ...city });
      result(null, { id: id, ...city });
    }
  );
};

City.remove = (id, result) => {
  sql.query("DELETE FROM cities WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found City with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted city with id: ", id);
    result(null, res);
  });
};

City.removeAll = (result) => {
  sql.query("DELETE FROM cities", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} cities`);
    result(null, res);
  });
};

module.exports = City;
