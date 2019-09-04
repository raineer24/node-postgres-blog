const express = require("express");
//const fileUpload = require("express-fileupload");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const routes = require("./server/routes/index");

const blogRoute = require("./routes/blog");

const useraccountRoute = require("./routes/useraccount");

const app = express();

const cors = require("cors");

const port = process.env.PORT || 5000;

const morgan = require("morgan");

app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
  })
);
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client")));
//app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
//app.use(fileUpload()); // configure fileupload

//app.use("/", routes);

app.use(
  cors({
    origin: "*",
    exposedHeaders: [
      "Content-Range",
      "X-Content-Range",
      "Content-Disposition",
      "Content-Error"
    ],
    credentials: true
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type,Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "PUT, POST, ,PATCH, DELETE, GET"
//     );
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/api/v2/blog", blogRoute);
app.use("/api/v2/useraccount", useraccountRoute);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
