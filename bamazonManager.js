//needs to view porducts available for sale, low inventory, add inventory, and add new products
//requires
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

  function viewCatalogue(){
    connection.query(`SELECT * FROM products`,(err,re)=>{
      re.forEach((index)=>{
        console.log(`PRODUCT ID: ${index.id}  PRODUCT NAME: ${index.product_name} PRICE: ${index.price} \n
        DEPARTMENT: ${index.department_name} IN-STOCK: ${index.stock_qty}`);
        
      });
      //prompt actions
    })
  }
  function viewLows(){
    connection.query(`SELECT * FROM products WHERE qty < 100`,(er,re)=>{
      re.forEach((index)=>{
        console.log(`PRODUCT ID: ${index.id}  PRODUCT NAME: ${index.product_name} PRICE: ${index.price} \n
        DEPARTMENT: ${index.department_name} IN-STOCK: ${index.stock_qty}`);
        
      });
    });
    //prompt actions like restock or discontinue the item
  }
  function AddProducts(){
    
  }