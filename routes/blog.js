const express = require("express");
const router = express.Router();
const pg = require("pg");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const blogController = require("../controllers/blog");
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

router.get("/", blogController.blogs_get_all);

router.post("/", checkAuth, upload.single("image"), (req, res) => {
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
        res.status(200).send(`User modified with ID: ${id}`);
      }
    );
  });
});

module.exports = router;
