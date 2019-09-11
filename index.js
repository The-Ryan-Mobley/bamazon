//require('dotenv').config()
const inquirer = require('inquirer');
//const sql = require('mysql');
const connection = require('./db.js');
//const customer = require('./bamazonCustomer.js');
//const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');


//used for password encryption
const crypto = require('crypto');
const cryptoSecret = process.env.CRYPTO_SECRET.toString();
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
    connection.query(`SELECT pass,salt FROM users WHERE user_name = ?`,re.user,(er,base)=>{
      if(er) throw er;
      console.log(base);
      let hashPass = readHash(re.pass,base[0].salt);
      if(base[0].pass === hashPass){
        console.log('validated');
      }
      else{
        console.log('invalid');
      }

    });
  })
}
//let s = new supervisor();
//supervisor.main();
function createLogin() {
  inquirer.prompt([{
    type: 'input',
    message: 'Enter your desired username under 30 characters: ',
    name: 'userName'
  }]).then((re) => {
 
    if (re.userName.length <= 30) {
      connection.query('SELECT user_name FROM users', (er, queryResponse) => {
        if (er) throw er;
        
        if (queryResponse.indexOf(re.userName) === -1) {
       
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
  inquirer.prompt([{
    type: 'input',
    message: 'enter your desired password: ',
    name: 'passWord'
  }]).then((re) => {
    hashIt(re.passWord,userName);

  });
}

function hashIt(string,userName) {
    let salt = genRandomString(16); /** Gives us salt of length 16 */
    let passwordData = sha512(string, salt);
    console.log('UserPassword = '+string);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    let sqlString = `INSERT INTO users (user_name,pass,salt) VALUES (?,?,?)`;
    
    connection.query(sqlString,[userName,passwordData.passwordHash,passwordData.salt],(er)=>{
      if(er) throw er;
      console.log('user added!');
    });
}
function readHash(string,salt){ 
  let passwordData = sha512(string, salt);
  return passwordData.passwordHash;

}
 
Login();