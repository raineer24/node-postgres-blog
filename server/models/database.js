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
  console.log("connected to the Database");
});

const createTables = () => {
  const schoolTable = `CREATE TABLE IF NOT EXISTS
      blogs(
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        content VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )`;
  pool
    .query(schoolTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool
};

require("make-runnable");
