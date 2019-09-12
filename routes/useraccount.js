const express = require("express");
const router = express.Router();
const pg = require("pg");
const multer = require("multer");

const jwt = require("jsonwebtoken");
const userController = require("../controllers/user");
require("dotenv").config();
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function(req, file, cb) {
  //accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dwsbpkgvr",
  api_key: "246382268158277",
  api_secret: "OEJwFk8xMOuNID7Z7L5MNDJ9nY8"
});

// // Add route code Here
// router.get("/", (req, res) => {
//   res.send("Api Postgres");
// });

const config = {
  user: "ner", //this is the db user credential
  database: "apiblog",
  password: "ner",
  port: 5000,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

router.get("/", userController.users_get_all);

router.post("/", (req, res, next) => {
  console.log(req.file);

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

  console.log("title", title);

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

router.post("/", upload.single("image"), (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  //let image_url = req.body.image_url;
  let created_at = req.body.created_at;
  let updated_at = req.body.updated_at;
  cloudinary.uploader.upload(req.file.path, results => {
    //console.log(resu);

    pg.connect(connectionString, (err, client, done) => {
      var queryString =
        "INSERT INTO blogs (title, content, image_url) VALUES (" +
        "'" +
        [title, content, results.secure_url].join("','") +
        "'" +
        ") RETURNING *";

      client.query(queryString, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).send({ status: "Successful", result: result.rows[0] });
      });
    });
  });
});

//user signup
router.post("/signup", userController.users_create_user);

//user login
router.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  let titleQuery = "SELECT * FROM useraccount WHERE email = '" + email + "'";
  pg.connect(connectionString, (err, client, done) => {
    client.query(titleQuery, (err, result) => {
      // console.log("result.rows[0]", result.rows[0].password);

      if (result.rows < "1") {
        return res.status(401).json({
          message: "Auth failed"
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
              message: "Auth failed"
            });
          }
        })
        .catch(err => console.log(err));
    });
  });
});

router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  pg.connect(connectionString, (err, client, done) => {
    client.query(
      "UPDATE blogs SET title =$1, content = $2 WHERE id =$3",
      [title, content, id],
      (error, result) => {
        if (err) {
          console.log(error);

          return res.status(500).send(error);
        }
        git;
        res.status(200).send(`User modified with ID: ${id}`);
      }
    );
  });
});

module.exports = router;
