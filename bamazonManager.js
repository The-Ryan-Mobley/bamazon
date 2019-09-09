//needs to view porducts available for sale !, low inventory !, add inventory, and add new products!
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
      catalogueMenu();
    })
  }
  function catalogueMenu(){
    inquirer.prompt([
      {
        type:'list',
        message:'Options:',
        choices:['View lows','Add an Item','Increase Stock','Remove an Item','back'],
        name:'option'
      }
    ]).then((re)=>{
      switch(re.option){
        case 'View Lows':{
          viewLows();
          break;
        }
        case 'Add an Item':{
          AddProducts();
          break;
        }
        case 'Increase Stock':{
          inventoryPrompt();
          break;
        }
        case 'Remove an Item':{
          removePrompt();
          break;
        }
        case 'back':{
          main();
          break;
        }
        default:{
          catalogueMenu();
        }
      }
    })
  } 
  function viewLows(){
    connection.query(`SELECT * FROM products WHERE qty < 100`,(er,re)=>{
      re.forEach((index)=>{
        console.log(`PRODUCT ID: ${index.id}  PRODUCT NAME: ${index.product_name} PRICE: ${index.price} \n
        DEPARTMENT: ${index.department_name} IN-STOCK: ${index.stock_qty}`);   
      });
    });
    lowMenu();
    //prompt actions like restock or discontinue the item
  }
  function lowMenu(){
    inquirer.prompt([
      {
        type:'list',
        message:'Options:',
        choices:['order inventory','remove item','back'],
        name:'menu'
      }
    ]).then((re)=>{
      switch(re.menu){
        case 'order inventory':{
          inventoryPrompt();
          break;
        }
        case 'remove item':{
          removePrompt();
          break;
        }
        case 'back':{
          main();
          break;
        }
        default:{
          lowMenu();
        }
      }
    })
  }
  function inventoryPrompt(){
    inquirer.prompt([
      {
        type:'numeric',
        message:'enter the id of the product you want to update',
        name:'index'
      }
    ]).then((re)=>{
      reStock(re.index);
    })
  }
  function reStock(id){
    inquirer.prompt([
      {
        type:'numeric',
        message:'Enter the amount you want to add to stock',
        name:'quantity'

      }
    ]).then((pro)=>{
      let data = [pro.quantity,id];
      let queryString = `UPDATE products SET stock_qty = stock_qty - ? WHERE id= ?`
      connection.query(queryString,data,(er,addition)=>{
        if(er) throw er;
        console.log('stock updated! returning to main menu');
        main();


      });

    });
  }
  function AddProducts(){
    inquirer.prompt([
      {
        type:'input',
        message:'enter the following seperated by commas with no spaces: \nproduct name, department name price and quantity',
        name:'rowdata'
      }
    ]).then((re)=>{
      let data = re.rowdata.split(',');
      let sqlString = `INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (?,?,?,?)`;
      connection.query(sqlString,data,(er,add)=>{
        if(er) throw er;
        console.log(`added ${data[0]} under ${data[1]}`);
        console.log('retunring to main menu');
        main();

      })
    });
  }
  function removePrompt(){
    inquirer.prompt([
      {
        type:'numeric',
        message:'Enter the id of the item you want to remove',
        name:'out'
      }
    ]).then((re)=>{
      warningPrompt(re.out);
    })
  }
  function warningPrompt(id){
    inquirer.prompt([
      {
        type:'confirm',
        message:'WARNING you are about to remove this item completely are you sure?',
        name:'warn'
      }
    ]).then((re)=>{
      if(re.warn){
        connection.query(`DELETE FROM products WHERE id = ?`,id,(er,del)=>{
          if(er) throw er;
          console.log('item removed returning to main menu');
          main();

        });
      }
      else{
        console.log('returning to low view');
        viewLows();
      }
      
    })
  }
  function quit(){
    console.log('goodbye!');
    connection.end();
  }
  function main(){
    inquirer.prompt([
      {
        type:'list',
        message:'Welcome to the Bamazon Management Client',
        choices:['View Products','View low/oos Products','quit'],
        name:'funk'
      }
    ]).then((re)=>{
      switch(re.funk){
        case 'View Products':{
          viewCatalogue();
          break;
        }
        case 'View low/oos Products':{
          viewLows();
          break;
        }
        case 'quit':{
          quit();
          break;
        }
        default:{
          main();
        }
      }

    })

  }
  main();