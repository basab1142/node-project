const mysql = require('mysql');

const con = mysql.createConnection({
    host:"mydb.c5rlvnugwvna.ap-south-1.rds.amazonaws.com",
    user:"admin",
    password: "password123",
    database:"dbms",
    port: 3306


})

con.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Connection created');
})

module.exports.con = con;