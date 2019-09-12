const pg = require("pg");
import helper from './helper';
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";



exports.users_get_all = (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //console.log("err=", err);
    const query = "SELECT * FROM useraccount";
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
          message: "Blog information retrievedss",
          blogs: result.rows
        });
      }
      //res.send({ result });
    });
  });
};

exports.users_create_user = (req, res, next) => {
  const { username, email, password } = req.body;
  const saltRounds = 12;
  pg.connect(connectionString, (err, client, done) => {
    // SQL Query > Insert data
    if()
    let titleQuery = "SELECT * FROM useraccount WHERE email = '" + email + "'";
    client.query(titleQuery, (err, result) => {
      if (result.rows > "1") {
        console.log("length", result.length);
        message = "Title already exists";
        return res
          .status(400)
          .send({ message: "User with that EMAIL already exist" });
      } else {
        bcrypt.hash(req.body.password, 12, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const query =
              "INSERT INTO useraccount (username, email, password) VALUES (" +
              "'" +
              [username, email, hash].join("','") +
              "'" +
              ") RETURNING *";
            client.query(query, (err, result) => {
              //console.log(res);
              res.status(201).json({ result });
            });
          }
        });
      }
      console.log("result", result);
    });
  });
};
