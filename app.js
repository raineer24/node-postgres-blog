const express = require("express");
//const fileUpload = require("express-fileupload");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const routes = require("./server/routes/index");

const blogRoute = require("./routes/blog");

const app = express();

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

app.use("/", routes);
app.use("/api/v2/blog", blogRoute);
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
