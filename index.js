require('dotenv').config()
const inquirer = require('inquirer');

const connection = require('./db.js');
const customer = require('./bamazonCustomer.js');
const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');

//used for password encryption
const crypto = require('crypto');
//const cryptoSecret = process.env.CRYPTO_SECRET.toString();
let genRandomString = (length) => { //makes the hash salt
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
let sha512 = (password, salt)=>{
  let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  };
};


function Login(){
  inquirer.prompt([
    {
      type:'input',
      message:'Enter Username',
      name:'user'
    },
    {
      type:'input',
      message:'Enter Password',
      name:'pass'
    }
  ]).then((re)=>{
    connection.query(`SELECT pass,salt,user_type FROM users WHERE user_name = ?`,re.user,(er,base)=>{
      if(er) throw er;
  
      let hashPass = readHash(re.pass,base[0].salt);
      if(base[0].pass === hashPass){
        console.log(`Welcome back ${re.user}!`);
        landing(base[0].user_type);
      }
      else{
        console.log('invalid password');
        Login();
      }

    });
  })
}
function landing(credentials){
  switch(credentials){
    case 'supervisor':{
      supervisor.main();
      break;
    }
    case 'manager':{
      manager.main();
      break;
    }
    case 'customer':{
      customer.main();
    }
    default:{
      console.log('something went wrong returning to menu');
      BamazonMain();
    }
  }
}

function createLogin() {
  inquirer.prompt([{
    type: 'input',
    message: 'Enter your desired username under 30 characters: ',
    name: 'userName'
  }]).then((re) => {
 
    if (re.userName.length <= 30) {
      connection.query('SELECT user_name FROM users', (er, queryResponse) => {
        if (er) throw er;
        console.log(queryResponse);
        if (queryResponse[0].user_name !== re.userName) {
       
          createPassword(re.userName);

        } else {
          console.log('username already taken please enter a different name');
          createLogin();
        }
      })

    }



  })

}

function createPassword(userName) {
  inquirer.prompt([
  {
    type: 'input',
    message: 'enter your desired password: ',
    name: 'passWord'
  },
  {
    type:'list',
    message:'lastly select the type of user you want the account to be',
    choices:['customer','manager','supervisor'],
    name:'role'
  }
  ]).then((re) => {
    hashIt(re.passWord,userName,re.role);

  });
}

function hashIt(string,userName,userType) {
    let salt = genRandomString(16); /** Gives us salt of length 16 */
    let passwordData = sha512(string, salt);
    let sqlString = `INSERT INTO users (user_name,pass,salt,user_type) VALUES (?,?,?,?)`;
    
    connection.query(sqlString,[userName,passwordData.passwordHash,passwordData.salt,userType],(er)=>{
      if(er) throw er;
      console.log('user added! returning to main menu');
      BamazonMain();
    });
}
function readHash(string,salt){ 
  let passwordData = sha512(string, salt);
  return passwordData.passwordHash;

}
function quit(){
  console.log('goodbye!');
  connection.end();
}
function BamazonMain(){
  console.log('Welcome to bamazon!');
  inquirer.prompt([
    {
      type:'list',
      message:'Options',
      choices:['Login','New User','Quit'],
      name:'menu'
    }
  ]).then((re)=>{
    switch(re.menu){
      case 'Login':{
        Login();
        break;

      }
      case 'New User':{
        createLogin();
        break;

      }
      case 'Quit':{
        quit();
        break;
      }
      default:{
        BamazonMain();
        break;
      }

    }

  });

}
 
BamazonMain();