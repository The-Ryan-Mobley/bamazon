require('dotenv').config()
const inquirer = require('inquirer');
const sql = require('mysql');


var connection = sql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : process.env.SQL_PW,
    database : 'bamazon'
  });
   
  connection.connect();
   
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
  connection.end();
