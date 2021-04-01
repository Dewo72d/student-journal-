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
exports.insertingStudent = (req, res) => {
  const name = req.body.name;
  const group = req.body.group;
  let q = `INSERT INTO students (studentGroup,fullName) VALUES ('${group}','${name}')`;//шукаємо в БД чи є такий студент
  if (name === '' || group === '') {
    res.status(200).json({
      message: "Ви не ввели студента чи групу"
    })
  }
  else {
    let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//шукаємо в БД чи є такий студент
    db.connection.query(selectName, (err, result) => {
      if (result.length > 0)
        res.status(200).json({
          message: "Такий студент вже існує"
        })
      else {
        db.connection.query(q, (error, result2) => {//добавляємо в БД на основі вибірки
          if (error) res.status(401).json({
            message: "Помилка",
          })
          res.status(200).json({
            message: "Студента було додано",
          })
        })
      }
    });
  }
}
exports.deletingStudent = (req, res) => {
  const name = req.body.name;
  const group = req.body.group;
  console.log(group, name);
  if (name.length == 0 || group.length == 0) {
    res.status(200).json({
      message: "Ви не ввели студента чи групу",
    })
  }
  else {
    let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//шукаємо в БД чи є такий студент
    db.connection.query(selectName, (err, result) => {
      if (result.length == 0) {
        res.status(200).json({
          message: "Такого студента немає",
        })
      }
      else {
        let q = `DELETE FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//видаляємо на основі вибірки
        db.connection.query(q, (error, result2) => {
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
exports.uppdateStudent = (req, res) => {
  let uppdateGroup = `UPDATE students SET students.studentGroup = students.studentGroup + 100 WHERE (students.studentGroup + 100) < 500`;
  let selectGroup = `SELECT * FROM students WHERE (studentGroup + 100) > 500`;
  let deleteStudentGroup = `DELETE FROM students WHERE (students.studentGroup + 100) > 500`;
  db.connection.query(selectGroup, (err, result) => {//шукаємо випускників
    if (result.length > 0)
    {
      db.connection.query(deleteStudentGroup,(err2,result2)=>{//видаляємо їх
        if (err2) 
        {
          console.log(err2);
          res.status(404).json({
            message:"Помилка"
          })
        }
        else
        {
          db.connection.query(uppdateGroup,(err3,result3)=>{//переводимо інших на наступний курс
           if (err) res.status(404).json({
             message:"Помилка"
           })
           else{
            res.status(200).json({
              message:"Переведення успішно здійснено"
            })
           }
          })
        }
      })
    }
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
