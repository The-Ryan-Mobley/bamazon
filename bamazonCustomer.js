require('dotenv').config()
const inquirer = require('inquirer');
const sql = require('mysql');


const connection = sql.createConnection({
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
 
  function promptSearch(){
    inquirer.prompt([
      {
        type:'input',
        message:'what do you want to buy?',
        name:'item'
      }

    ]).then((re)=>{
      connection.connect();
      connection.query(`SELECT * FROM products WHERE product_name`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        // results.forEach((index)=>{

        // });
      });

    });
  }
  promptSearch();

  
