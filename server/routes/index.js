const express = require("express");
const router = express.Router();
const pg = require("pg");
const path = require("path");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";

const config = {
  user: "ner", //this is the db user credential
  database: "apiblog",
  password: "ner",
  port: 5000,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

// Add route code Here
router.get("/", (req, res) => {
  res.send("Api Postgres");
});

router.get("/api/v1/blogs", (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //console.log("err=", err);
    const query = "SELECT * FROM blogs";
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(500).json({ error });
      }
      if (result.rows < "1") {
        res.status(404).send({
          status: "Failed",
          message: "No blog information found"
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Blog information retrieved",
          blogs: result.rows
        });
      }
      //res.send({ result });
    });
  });
});
module.exports = router;
