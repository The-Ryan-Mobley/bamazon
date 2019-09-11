//require('dotenv').config()
const inquirer = require('inquirer');
//const sql = require('mysql');
//const connection = require('./db.js');
//const customer = require('./bamazonCustomer.js');
//const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');

//let s = new supervisor();
supervisor.main();

