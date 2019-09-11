require('dotenv').config()
const inquirer = require('inquirer');
//const sql = require('mysql');
const connection = require('./db.js');

function superSuite() {
    this.addDept = ()=> {
        inquirer.prompt([{
            type: 'input',
            message: 'enter dept name and overhead cost seperated by commas with no spaces EX(x,y)',
            name: 'info'
        }]).then((re) => {
            let data = re.info.split(',');
            let sqlstring = `INSERT INTO departments (department_name, overhead_cost, product_sales) VALUES (?,?,0.00)`;
            connection.query(sqlstring, data, (err) => {
                if (err) throw err;
                console.log('department added');
            })

        });
    }

    this.removeDept = ()=> {
        inquirer.prompt([{
            type: 'numeric',
            message: 'Enter the id of the department you want to remove',
            name: 'did'
        }]).then((re) => {
            this.removeWarning(re.did);
        });
    }

    this.removeWarning = (RemoveId)=> {
        inquirer.prompt([{
            type: 'confirm',
            message: 'WARNING! This will remove the department from the system are you sure?',
            default: false,
            name: 'warned'
        }]).then((re) => {
            if (re.warned === true) {
                this.departmentRemoval(RemoveId);
            } else {
                console.log('returning to main menu');
                this.main();
            }
        })
    }

    this.departmentRemoval = (RemoveId)=> {
        connection.query(`DELETE FROM products WHERE id = ?`, RemoveId, (er) => {
            if (er) throw er;
            console.log('department removed please inform your management team for item removal \nreturning to main menu');
            this.main();

        });

    }

    this.salesByDept = ()=> {
        let sqlString = `SELECT * FROM departments`;
        connection.query(sqlString, (er, results) => {
            if (er) throw er;
            let dataTable = [];
            results.forEach(index => {
                let profit = index.product_sales - index.overhead_cost;
                let block = {
                    ID: index.department_id,
                    DEPARTMENT_NAME: index.department_name,
                    SALES: index.product_sales,
                    PROFITS: profit
                };
                dataTable.push(block);
            })
            console.table(dataTable);
            this.salesMenu();
        })
    }

    this.salesMenu = ()=> {
        inquirer.prompt([{
            type: 'list',
            message: 'Options',
            choices: ['Add a Department', 'Remove a Department', 'Back'],
            name: 'menu'
        }]).then((re) => {
            switch (re.menu) {
                case 'Add a Department':{
                    this.addDept();
                  break;
                }
                case 'Remove a Department': {
                    this.removeDept();
                    break;
                }
                case 'Back': {
                    this.main();
                    break;
                }
                default: {
                    this.salesMenu();
                    break;
                }
            }

        });
    }

    this.quit = ()=> {
        console.log('goodbye!');
        connection.end();
    }

    this.main = ()=> {
        console.log('Welcome to the Bamazon Supervisor Client!');
        inquirer.prompt([{
            type: 'list',
            message: 'Main Menu:',
            choices: ['View Sales by Department', 'Add a Department', 'Quit'],
            name: 'menu'
        }]).then((re) => {
            switch (re.menu) {
                case 'View Sales by Department': {
                    this.salesByDept();
                    break;
                }
                case 'Add a Department':{
                    this.addDept();
                    break;
                }
                case 'Quit': {
                    this.quit();
                    break;
                }
            }

        });
    }
}
module.exports = new superSuite();
