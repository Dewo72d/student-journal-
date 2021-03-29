const db = require("../database/database");
//const jwt = require("jsonwebtoken");
//const { jwtSecret } = require("../config/authConfig");

exports.selection = (req, res) => {
  const group = req.body.group;
  const name = req.body.name;
  const lesson = req.body.lesson;
  const date = req.body.date;

  console.log(group, name, lesson, date);
  res.sendStatus(200);
};

exports.test = (req, res) => {
  let quer =
    "SELECT students.fullName,students.studentGroup,lesson.lessonNumber,lesson.value,lesson.Date FROM lesson,students WHERE YEAR(lesson.Date) = YEAR(CURRENT_DATE()) AND MONTH(lesson.Date) = MONTH(CURRENT_DATE()) AND lesson.studentId = students.id  ORDER BY Date ASC  ";
  db.connection.query(quer, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};
