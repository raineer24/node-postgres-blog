const pg = require("pg");

const config = {
  user: "ner", //this is the db user credential
  database: "apiblog",
  password: "ner",
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to the db");
});
/**
 * Create Blog Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )`;
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create Blog Table
 */
const createBlogTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      blogs(
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        content VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        user_id INTEGER REFERENCES  users(id)
      )`;
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Blog Table
 */
const dropBlogTable = () => {
  const queryText = "DROP TABLE IF EXISTS blogs";
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = "DROP TABLE IF EXISTS users";
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createBlogTable();
};
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropBlogTable();
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createBlogTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropBlogTable,
  dropAllTables
};

require("make-runnable");
