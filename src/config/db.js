const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  //database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

const promisePool = pool.promise();

async function CreateSchema(SQLSchema) {
  try {
    if (process.env.NODE_ENV === "test") {
      const SQLSchema = fs.readFileSync("./MYSQL_Schema_test.sql", {
        encoding: "utf8",
      });
      await promisePool.query(SQLSchema);
    } else {
      const SQLSchema = fs.readFileSync("./MYSQL_Schema.sql", {
        encoding: "utf8",
      });
      await promisePool.query(SQLSchema);
    }
  } catch (err) {
    throw err;
  }
}

CreateSchema();
module.exports = promisePool;
