const db = require("../database/database");
//const jwt = require("jsonwebtoken");
//const { jwtSecret } = require("../config/authConfig");

exports.testlog = (req, res) => {
  const testreq = req.body.testreq;
  db.reqLog(testreq);
  res.sendStatus(200);
};

exports.test = (req, res) => {
  db.connection.query("SELECT * FROM prepod", (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};
