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
   

  function welcomeList(){
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log('PRODUCTS LIST: \n');
        results.forEach((index)=>{
          console.log(`PRODUCT ID: ${index.id}  PRODUCT NAME: ${index.product_name} PRICE: ${index.price}`);
        });
        promptSearch();
      });
  }
  function promptSearch(){
    inquirer.prompt([
      {
        type:'input',
        message:'what do you want to buy?',
        name:'item'
      }

    ]).then((re)=>{
      let query =re.item.toString();
      connection.query(`SELECT product_name, price FROM products WHERE product_name LIKE '%${query}%'`, function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        results.forEach((index)=>{
          console.log(index);

        });
       
      });

    }).then(()=>{
      connection.end();
    })
  }
  welcomeList();

  
