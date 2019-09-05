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
    connection.query('SELECT * FROM products', (error, results)=> {
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
      connection.query(`SELECT id, product_name, price FROM products WHERE product_name LIKE '%${query}%'`, (error, results)=> {
        if (error) throw error;
        console.log(results);
        results.forEach((index)=>{
          console.log(index);

        });
        let resdata = JSON.stringify(results[0]);
        buyPrompt(resdata);
       
      });

    }).then(()=>{
      connection.end();
    })
  }
  function buyPrompt(reID){
    inquirer.prompt([
      {
        type:'confirm',
        message:'BUY?',
        name:'num'
      }
    ]).then((re)=>{
      if(re.num === true){
        
        console.log(reID);
        Purchase(reID);
        

      }

    });
  }

  function Purchase(prodID){ //log the varibles out
    let itemObj = JSON.parse(prodID);
    //needs to UPDATE database //take value from initial search query and mod it based on that
    console.log(itemObj.id);
    connection.query(`UPDATE products SET stock_qty = 'stock_qty - 1' WHERE id ='${itemObj.id.parseInt()}'`,(err,results)=>{
      if(err) throw err;
      console.log('oh yeah its all coming together'+results);

    });
  }


  welcomeList();

  
