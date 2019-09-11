const sql = require('mysql');


connection = sql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     : 3306,
    password : process.env.SQL_PW.toString(),
    database : 'bamazon',
});

connection.connect((err)=> {
    if (err) throw err;
});
module.exports = connection;