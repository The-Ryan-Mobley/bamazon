require('dotenv').config()
const inquirer = require('inquirer');
const sql = require('mysql');


var connection = sql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     : 3306,
    password : process.env.SQL_PW.toString(),
    database : 'bamazon',
  });
   
  connection.connect();
   
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0]);
  });
   
  connection.end();
