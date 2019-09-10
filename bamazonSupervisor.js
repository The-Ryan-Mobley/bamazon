//view sales by dept, add dept!
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

function addDept(){
    inquirer.prompt([
        {
            type:'input',
            message:'enter dept name and overhead cost',
            name:'info'
        }
    ]).then((re)=>{
        let data = re.info.split(',');
        let sqlstring = `INSERT INTO departments (department_name, overhead_cost) VALUES (?,?)`;
        connection.query(sqlstring,data,(err,addition)=>{
            if(err) throw err;
            console.log('department added');
        })

    });
}
function salesByDept(){
    /*`SELECT songs.title, songs.artist, albums.title, albums.release_year 
    from songs CROSS JOIN albums WHERE songs.artist = albums.artist ORDER BY albums.title ASC`*/
    let sqlString = `SELECT `
}