const mysql = require('mysql2');

// const options = {
//   client: 'mysql2',
//   connection: {
//     host : MYSQL_HOST,
//     //port : 3003,
//     user : MYSQL_USER,
//     password : MYSQL_PASSWORD,
//     database : MYSQL_DATABASE
//   },
//   pool: { 
//     min: 0, 
//     max: 10,
//     // afterCreate: (conn, done) => {
//     //   conn.query('SELECT VERSION();', (err)=>{
//     //     if (err) {
//     //       console.log(err)
//     //     }
//     //     done(err, conn)
//     //   }
//     // )}, 
//   },
// };

// const knex = require('knex')(options);

// knex.raw("SELECT VERSION()").then(
//   (version) => console.log((version[0][0]))
// ).catch((err) => { console.log( err); throw err })
//   .finally(() => {
//       knex.destroy();
//   });

// async function TestConnection(){
//     const ver = await knex.raw("SELECT VERSION()")
//     console.log(ver[0][0])
// }

// TestConnection()
const pool = mysql.createPool({
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