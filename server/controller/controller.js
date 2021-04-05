const db = require("../database/database");
//const jwt = require("jsonwebtoken");
//const {jwtSecret} = require("../config/authConfig");

// Эта функция для проверки типов ну или чего либо.
//Принимает только функции.
//Если условие TRUE выполняется колбек doOnTrue, иначе doOnFalse
function validator(checkFun, doOnTrue, doOnFalse) {
    if (typeof checkFun != "function" || typeof doOnTrue != "function" || typeof doOnFalse != "function") throw new Error("not a function");
    if (checkFun()) {
        return doOnTrue()
    } else {
        return doOnFalse()
    }
}

//----------------------------

exports.selection = (req, res) => {
    let date = validator(() => req.body.month === "true", () => `MONTH(lesson.Date) = MONTH('${req.body.date}')`, () => `lesson.Date = STR_TO_DATE('${req.body.date}', '%Y-%m-%d')`)
    let name = validator(() => req.body.name === "", () => "", () => `AND students.fullName LIKE '%${req.body.name}%'`)
    let group = validator(() => req.body.group === "", () => "", () => `AND students.studentGroup = ${req.body.group}`)
    let lesson = validator(() => req.body.lesson === "0", () => "", () => `AND lesson.lessonNumber = ${req.body.lesson}`)
    //------------------------------
    let sqlQuery = `SELECT students.fullName,students.studentGroup,lesson.lessonNumber,lesson.Date ,lesson.value FROM lesson,students WHERE ${date} AND lesson.studentId = students.id ${lesson} ${group} ${name} `;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
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
