const express = require("express");
const router = express.Router();
const pg = require("pg");
const path = require("path");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/apiblog";

// Add route code Here
router.get("/", (req, res) => {
  res.send("Welcome to Our SCHOOL API");
});

module.exports = router;
