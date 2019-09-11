require('dotenv').config()
const inquirer = require('inquirer');
const sql = require('mysql');
const customer = require('./bamazonCustomer.js');
const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');

const connection = sql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     : 3306,
    password : process.env.SQL_PW.toString(),
    database : 'bamazon',
  });
   
  connection.connect();

