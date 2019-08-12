const express = require("express");
const fileUpload = require("express-fileupload");
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

router.post("/api/v1/blogs1", (req, res, next) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  let message = "";
  let title = req.body.title;
  let content = req.body.content;
  //let image_url = req.body.image_url;
  let created_at = req.body.created_at;
  let updated_at = req.body.updated_at;
  let uploadedFile = req.files.image;
  let image_name = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split("/")[1];
  image_name = title + "." + fileExtension;

  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert data
    let titleQuery = "SELECT * FROM blogs WHERE title = '" + title + "'";

    client.query(titleQuery, (err, result) => {
      if (err) {
        console.log("err");

        return res.status(500).send(err);
      }
      if (result.rows > "1") {
        console.log("length", result.length);

        message = "Title already exists";
        return res
          .status(400)
          .send({ message: "User with that EMAIL already exist" });
      } else {
        // check the filetype before uploading it
        if (
          uploadedFile.mimetype === "image/png" ||
          uploadedFile.mimetype === "image/jpeg" ||
          uploadedFile.mimetype === "image/gif"
        ) {
          // upload the file to the /public/assets/img directory
          uploadedFile.mv(`public/assets/img/${image_name}`, err => {
            if (err) {
              console.log("err", err);

              return res.status(500).send(err);
            }
            // send the blog's details to the database;

            var queryString =
              "INSERT INTO blogs (title, content, image_url, created_at, updated_at) VALUES (" +
              "'" +
              [title, content, image_name, created_at, updated_at].join("','") +
              "'" +
              ") RETURNING *";

            title +
              "', '" +
              content +
              "','" +
              image_name +
              "','" +
              created_at +
              "','" +
              updated_at +
              "')";
            client.query(queryString, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              console.log("result.length", result.length);

              res
                .status(200)
                .send({ status: "Successful", result: result.rows[0] });
            });
          });
        } else {
          return res.status(400).send({
            message:
              "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed."
          });
        }
      }
    });
  });
});

router.post("/");
module.exports = router;
