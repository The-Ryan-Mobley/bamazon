require('dotenv').config()
const inquirer = require('inquirer');
const sql = require('mysql');


const connection = sql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: process.env.SQL_PW.toString(),
  database: 'bamazon',
});

connection.connect();




function welcomeList() {
  connection.query('SELECT * FROM products WHERE stock_qty > 0', (error, results) => {
    if (error) throw error;

    let displayArr = []; //holds data for each item and displays it as a unified table
    results.forEach((index) => {
      var block = {
        PRODUCTID: index.id,
        PRODUCTNAME: index.product_name,
        PRICE: index.price
      };
      displayArr.push(block);
    });
    console.table(displayArr);

    promptSearch(); //user input begins here
  });
}

function promptSearch() {
  inquirer.prompt([{
      type: 'numeric',
      message: 'enter the id of the item you want to buy, or zero to return to menu',
      default: 0,
      name: 'item'
    }

  ]).then((re) => {
    if (re.item != 0) {
      let DBquery = re.item;
      connection.query(`SELECT * FROM products WHERE id = ?`, DBquery, (error, results) => {
        if (error) throw error;
        console.table([{
          PRODUCTID: results[0].id,
          PRODUCTNAME: results[0].product_name,
          PRICE: results[0].price
        }]);

        let passData = JSON.stringify(results);
        buyPrompt(passData);

      });
    } else {
      main();
    }

  });
}

function buyPrompt(productData) {
  let productInfo = JSON.parse(productData);
  inquirer.prompt([{
      type: 'confirm',
      message: 'do you want to buy this item?',
      name: 'boo'
    },
    {
      type: 'number',
      message: 'how many?',
      name: 'num'
    }
  ]).then((re) => {
    if ((productInfo[0].stock_qty >= 0) && re.num <= productInfo[0].stock_qty) {
      if (re.boo === true) {
        Purchase(re.num, productData);

      } else {
        welcomeList();
      }
    } else {
      console.log('Out of stock sorry about that');
      welcomeList();


    }

  });
}

function Purchase(qtyNumber, passData) { //log the varibles out
  let productInfo = JSON.parse(passData);

  connection.query(`UPDATE products SET stock_qty = stock_qty - ? WHERE id =?`, [qtyNumber, productInfo[0].id], (err, results) => {
    if (err) throw err;
    console.log(`Thank you! you're order has been succesfully sent to our warehouse for processing!`);
    updateSales(qtyNumber, passData);

  });
}

function updateSales(qty, passData) {
  let productInfo = JSON.parse(passData);

  let combinedTotal = productInfo[0].price * qty;

  let sqlString = `UPDATE departments SET product_sales = product_Sales + ? WHERE department_name = ?`;
  connection.query(sqlString, [combinedTotal, productInfo[0].department_name], (err) => {
    if (err) throw err;
    console.log(`You're order has been accepted!`);
    afterSalePrompt();

  });
}

function afterSalePrompt() {
  inquirer.prompt([{
    type: 'confirm',
    message: 'Continue Shopping?: ',
    name: 'cs'
  }]).then((re) => {
    if (re.cs) {
      welcomeList();
    } else {
      main();
    }
  })
}

function quitOp() {
  console.log('goodbye!');
  connection.end();
}

function main() {
  console.log('Welcome to Bamazon!');
  inquirer.prompt([{
    type: 'list',
    message: 'What do you want to do?',
    choices: ['Browse Inventory', 'Quit'],
    name: 'choice'
  }]).then((re) => {
    switch (re.choice) {
      case 'Browse Inventory': {
        welcomeList();
        break;
      }
      case 'Quit': {
        quitOp();
        break;
      }
      default: {
        main();
        break;
      }
    }

  });

}



main();