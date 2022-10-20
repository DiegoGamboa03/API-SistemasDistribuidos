const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'labs-dbservices01.ucab.edu.ve',
    user: 'bd2_202215_27158735',
    password: '27158735',
    port:3306,
    database:'bd2_202215_grupo4'
  });
  
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;