//requires
require('dotenv').config()
const inquirer = require('inquirer');
const connection = require('./db.js');


module.exports = function managerSuite() {
  this.viewCatalogue = ()=> {
    connection.query(`SELECT * FROM products`, (err, re) => {
      if (err) throw er;
      let displayTable = [];
      re.forEach((index) => {
        let block = {
          PRODUCT_ID: index.id,
          PRODUCT_NAME: index.product_name,
          PRICE: index.price,
          DEPARTMENT: index.department_name,
          IN_STOCK: index.stock_qty
        };
        displayTable.push(block);
      });
      console.table(displayTable);
      this.catalogueMenu();
    })
  }

  this.catalogueMenu = ()=> {
    inquirer.prompt([{
      type: 'list',
      message: 'Options:',
      choices: ['View low/oos Products', 'Add an Item', 'Increase Stock', 'Remove an Item', 'back'],
      name: 'option'
    }]).then((re) => {
      switch (re.option) {
        case 'View low/oos Products': {
          this.viewLows();
          break;
        }
        case 'Add an Item': {
          this.AddProducts();
          break;
        }
        case 'Increase Stock': {
          this.inventoryPrompt();
          break;
        }
        case 'Remove an Item': {
          this.removePrompt();
          break;
        }
        case 'back': {
          this.main();
          break;
        }
        default: {
          this.catalogueMenu();
          break;
        }
      }
    })
  }

  this.viewLows = ()=> {
    connection.query(`SELECT * FROM products WHERE stock_qty < 100`, (er, re) => {
      if (er) throw er;
      let displayTable = [];
      re.forEach((index) => {
        let block = {
          PRODUCT_ID: index.id,
          PRODUCT_NAME: index.product_name,
          PRICE: index.price,
          DEPARTMENT: index.department_name,
          IN_STOCK: index.stock_qty
        };
        displayTable.push(block);
      });
      console.table(displayTable);
      this.lowMenu();
    });

  }

  this.lowMenu = ()=> {
    inquirer.prompt([{
      type: 'list',
      message: 'Options:',
      choices: ['order inventory', 'remove item', 'back'],
      name: 'menu'
    }]).then((re) => {
      switch (re.menu) {
        case 'order inventory': {
          this.inventoryPrompt();
          break;
        }
        case 'remove item': {
          this.removePrompt();
          break;
        }
        case 'back': {
          this.main();
          break;
        }
        default: {
          this.lowMenu();
          break;
        }
      }
    })
  }

  this.inventoryPrompt = ()=> {
    inquirer.prompt([{
      type: 'numeric',
      message: 'enter the id of the product you want to update, or 0 to return to pervious menu',
      name: 'index'
    }]).then((re) => {
      if (re.index != 0) {
        this.reStock(re.index);
      } else {
        this.lowMenu();
      }
    })
  }

  this.reStock = (id)=> {
    inquirer.prompt([{
      type: 'numeric',
      message: 'Enter the amount you want to add to stock',
      name: 'quantity'

    }]).then((pro) => {
      if(Math.sign(pro.quantity) === 1){
        let data = [pro.quantity, id];
        let queryString = `UPDATE products SET stock_qty = stock_qty + ? WHERE id= ?`
        connection.query(queryString, data, (er, addition) => {
          if (er) throw er;
          console.log('stock updated! returning to main menu');
          this.main();
        });
      }else{
        console.log(`INVALID NUMBER please don't enter a negative number`);
        reStock(id);
      }
    });
  }

  this.AddProducts = ()=> {
    inquirer.prompt([{
      type: 'input',
      message: 'enter the following seperated by commas with no spaces: \nproduct name, department name price and quantity (EX: x,y,z)',
      name: 'rowdata'
    }]).then((re) => {
      let data = re.rowdata.split(',');
      let sqlString = `INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (?,?,?,?)`;
      connection.query(sqlString, data, (er, add) => {
        if (er) throw er;
        console.log('item added!');
        console.table([{
          PRODUCT_NAME: data[0],
          DEPARTMENT_NAME: data[1],
          PRICE: data[2],
          STOCK_QUANTITY: data[3]
        }]);
        console.log('retunring to main menu');
        this.main();

      })
    });
  }

  this.removePrompt = ()=> {
    inquirer.prompt([{
      type: 'numeric',
      message: 'Enter the id of the item you want to remove',
      name: 'out'
    }]).then((re) => {
      this.warningPrompt(re.out);
    })
  }

  this.warningPrompt = (id)=> {
    inquirer.prompt([{
      type: 'confirm',
      message: 'WARNING you are about to remove this item completely are you sure?',
      name: 'warn'
    }]).then((re) => {
      if (re.warn) {
        connection.query(`DELETE FROM products WHERE id = ?`, id, (er, del) => {
          if (er) throw er;
          console.log('item removed returning to main menu');
          this.main();
        });
      } else {
        console.log('returning to low view');
        this.viewLows();
      }

    })
  }

  this.main = ()=> {
    inquirer.prompt([{
      type: 'list',
      message: 'Welcome to the Bamazon Management Client',
      choices: ['View Products', 'View low/oos Products', 'Logout'],
      name: 'funk'
    }]).then((re) => {
      switch (re.funk) {
        case 'View Products': {
          this.viewCatalogue();
          break;
        }
        case 'View low/oos Products': {
          this.viewLows();
          break;
        }
        case 'Logout': {
          this.logout();
          break;
        }
        default: {
          this.main();
          break;
        }
      }

    });

  }
}
//module.exports = new managerSuite();