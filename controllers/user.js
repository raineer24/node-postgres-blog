const pg = require("pg");
//const helper = require("./helper");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports.users_get_all = (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //console.log("err=", err);
    const query = "SELECT * FROM users";
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
  const { username, email, first_name, image_url, password } = req.body;
  const saltRounds = 12;
  pg.connect(connectionString, (err, client, done) => {
    // SQL Query > Insert data

    let titleQuery = "SELECT * FROM users WHERE email = '" + email + "'";
    client.query(titleQuery, (err, result) => {
      if (validateEmail(req.body.email)) {
        if (result.rows > "1") {
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
                "INSERT INTO users (username, first_name, image_url, password, email) VALUES (" +
                "'" +
                [username, first_name, image_url, hash, email].join("','") +
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
      } else {
        next(new Error("Invalid Email add"));
      }

      // if (!helper.isValidEmail(req.body.email)) {
      //   return res
      //     .status(400)
      //     .send({ message: "Please enter a valid email address" });
      // }
    });
  });
};

exports.users_login_user = (req, res, next) => {
  const { username, email, password } = req.body;
  let titleQuery = "SELECT * FROM useraccount WHERE email = '" + email + "'";
  pg.connect(connectionString, (err, client, done) => {
    client.query(titleQuery, (err, result) => {
      // console.log("result.rows[0]", result.rows[0].password);

      // let filteredUsers = result.rows(res => {
      //   return res.
      // })

      if (result.rows < "1") {
        return res.status(401).json({
          message: "Auth failedss"
        });
      }
      console.log(result.rows[0].password);
      console.log(req.body.password);
      bcrypt
        .compare(req.body.password, result.rows[0].password)
        .then(results => {
          if (results) {
            const token = jwt.sign(
              {
                email: result.rows[0].password,
                id: result.rows[0].id
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth Successful",
              token: token,
              results
            });
          } else {
            return res.status(401).json({
              message: "Incorrect password"
            });
          }
        })
        .catch(err => console.log(err));
    });
  });
};
