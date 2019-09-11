const pg = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dwsbpkgvr",
  api_key: "246382268158277",
  api_secret: "OEJwFk8xMOuNID7Z7L5MNDJ9nY8"
});

exports.blogs_get_all = (req, res, next) => {
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

exports.blogs_create_blog = (req, res, next) => {
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
};

// module.exports = {
//   blogs_get_all
// };
