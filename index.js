//require('dotenv').config()
const inquirer = require('inquirer');
//const sql = require('mysql');
const connection = require('./db.js');
//const customer = require('./bamazonCustomer.js');
//const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');
const crypto = require('crypto');
const cryptoSecret =  process.env.CRYPTO_SECRET.toString();

//let s = new supervisor();
supervisor.main();
function createLogin(){
  inquirer.prompt([
    {
      type:'input',
      message:'Enter your desired username under 30 characters: ',
      name:'userName'
    }
  ]).then((re)=>{
    if(re.userName.length <= 30){
      connection.query('SELECT user_name FROM users',(er,re)=>{
        if(er) throw er;
        if(re.indexOf(re.userName) === -1){
          createPassword(re.userName);

        }
        else{
          console.log('username already taken please enter a different name');
          createLogin();
        }
      })

    }

    

  })

}
function createPassword(userName){
  inquirer.prompt([
    {
      type:'input',
      message:'enter your desired password: ',
      name:'passWord'
    }
  ]).then((re)=>{

  });
}
function hashIt(string){
  let salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHmac(string, cryptoSecret)
                   .update('I love cupcakes')
                   .digest('hex');


}
