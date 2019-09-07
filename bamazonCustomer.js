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
  function opening(){
    console.log('Welcome to Bamazon!');
    inquirer.prompt([
      {
        type:'list',
        message: 'What do you want to do?',
        choices:['Browse Inventory','Quit'],
        name:'choice'
      }
    ]).then((re)=>{
      if(re.choice === 'Browse Inventory'){
        welcomeList();
      }else{
        quitOp();
      }

    });

  }

   

  function welcomeList(){
    connection.query('SELECT * FROM products', (error, results)=> {
        if (error) throw error;
        console.log('PRODUCTS LIST: \n');

        results.forEach((index)=>{
          console.log(`PRODUCT ID: ${index.id}  PRODUCT NAME: ${index.product_name} PRICE: ${index.price}`);
          
        });
        
        //pass products into pormpt search so you can use the list to purchase items
        promptSearch();
      });
  }
  function promptSearch(){
    inquirer.prompt([
      {
        type:'numeric',
        message:'enter the id of the item you want to buy',
        name:'item'
      }

    ]).then((re)=>{
      let DBquery =re.item;
      connection.query(`SELECT id, product_name, price FROM products WHERE id = ?`,DBquery, (error, results)=> {
        if (error) throw error;
        console.log(results);
        results.forEach((index)=>{
          console.log(index);

        });
        let resdata = JSON.stringify(results[0]);
        buyPrompt(resdata);
       
      });

    });
    //.then(()=>{
    //  connection.end();
    //})
  }
  function buyPrompt(reID){
    inquirer.prompt([
      {
        type:'confirm',
        message:'do you want to buy this item?',
        name:'boo'
      },
      {
        type:'number',
        message:'how many?',
        name:'num'
      }
    ]).then((re)=>{
      if(re.boo === true){
        console.log(reID);
        Purchase(reID,re.num);
        

      }else{
        promptSearch();
      }

    });
  }
 
  function Purchase(prodID,numeric){ //log the varibles out
    let itemObj = JSON.parse(prodID);
    //needs to UPDATE database //take value from initial search query and mod it based on that
    console.log(itemObj.id);
    connection.query(`UPDATE products SET stock_qty = stock_qty - ? WHERE id =?`,[numeric,itemObj.id],(err,results)=>{
      if(err) throw err;
      console.log('oh yeah its all coming together' + JSON.stringify(results));
      connection.end();


    });
  }
  function quitOp(){
    console.log('goodbye!');
    connection.end();
  }



opening();