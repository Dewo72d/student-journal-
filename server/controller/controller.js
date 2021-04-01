const db = require("../database/database");
//const jwt = require("jsonwebtoken");
//const { jwtSecret } = require("../config/authConfig");

exports.selection = (req, res) => {
  const group = req.body.group;
  const name = req.body.name;
  const lesson = req.body.lesson;
  const date = req.body.date;

  console.log(group, name, lesson, date);
  let q = `SELECT students.fullName,students.studentGroup,lesson.lessonNumber,lesson.value FROM lesson,students WHERE lesson.lessonNumber=${lesson} `;
  db.connection.query(q, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};
exports.insertingStudent = (req,res) =>{
  const name = req.body.name;
  const group = req.body.group;
  let q = `INSERT INTO students (studentGroup,fullName) VALUES ('${group}','${name}')`;
  console.log(group, name);
  if (name === '' || group === '')
  {
    res.send('0');
  }
  else
  {
    db.connection.query(q, (err, result) => {
      if (err) res.send('0');
      res.send('1');
    });
  }
}
exports.deletingStudent = (req,res) =>{
  const name = req.body.name;
  const group = req.body.group;
  console.log(group, name);
  if (name.length == 0 || group.length == 0)
  {
    res.status(200).json({
      message: "Ви не ввели студента чи групу",
    })
  }
  else
  {
    let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;
    db.connection.query(selectName, (err, result) => {
      if (result == 0)
      {
        res.status(200).json({
          message: "Такого студента немає",
        })
      }
      else
      {
      let q = `DELETE FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;
      db.connection.query(q,(error,result2)=>{
        if (error) res.status(401).json({
          message: "Помилка",
        })
        res.status(200).json({
          message: "Студента було видалено",
        })
      })        
      }
    });
  }
}
exports.uppdateStudent = (req,res) =>{
  let selectGroup = `UPDATE students SET students.studentGroup = students.studentGroup + 100 WHERE (students.studentGroup + 100) < 500`;
  db.connection.query(selectGroup,(err,result)=>{
    if (result.length === 0) res.send('0');
    res.send('1');
  })
}
exports.test = (req, res) => {
  let quer =
    "SELECT students.fullName,students.studentGroup,lesson.lessonNumber,lesson.value,lesson.Date FROM lesson,students WHERE YEAR(lesson.Date) = YEAR(CURRENT_DATE()) AND MONTH(lesson.Date) = MONTH(CURRENT_DATE()) AND lesson.studentId = students.id  ORDER BY Date ASC  ";
  db.connection.query(quer, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};
