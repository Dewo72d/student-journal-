const mysql = require("mysql2");
const config = require("../config/dbConfig");

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});

connection.connect((err) => {
  if (err) throw console.log(err);
  console.log("DB connected");
});

const reqLog = (sqlreq) => {
  connection.query(sqlreq, (err, result) => {
    if (err) console.log("Ошибочка " + err);
    console.log(result);
  });
};

const reqCollback = (sqlreq, fun) => {
  connection.query(sqlreq, (err, result) => {
    if (err) console.log("Ошибочка " + err);
    fun();
  });
};

const db = {};
db.reqLog = reqLog;
db.reqCollback = reqCollback;
db.connection = connection;

module.exports = db;
