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
        results.forEach((index)=>{
          console.log(index);

        });
        buyPrompt(results);
       
      });

    }).then(()=>{
      connection.end();
    })
  }
  function buyPrompt(JSONResponse){
    inquirer.prompt([
      {
        type:'confirm',
        message:'YOU BUY?',
        name:'num'
      }
    ]).then((re)=>{
      if(re.num === true){
        Purchase(JSONResponse);

      }

    });
  }

  function Purchase(JSONResponse){ //log the varibles out
    //needs to UPDATE database //take value from initial search query and mod it based on that
    let minus = JSONResponse.quantity--;
    let sqlUpdate = `UPDATE products SET quantity = quantity + 1 WHERE id = ${JSONResponse.id}`;
    connection.query(sqlUpdate,(err,results)=>{
      if(err) throw err;
      console.log('oh yeah its all coming together');

    });
  }


  welcomeList();

  
