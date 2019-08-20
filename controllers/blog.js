const pg = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";
const blogs_get_all = (req, res, next) => {
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
          status: "Successful controllers blog",
          message: "Blog information retrieved",
          blogs: result.rows
        });
      }
      //res.send({ result });
    });
  });
};

module.exports = {
  blogs_get_all
};
