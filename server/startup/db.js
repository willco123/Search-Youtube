require('dotenv').config();
const mysql = require('mysql2');



const pool = mysql.createPool({//Edit user, password as appropriate
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });

const promisePool = pool.promise();

module.exports = promisePool;


