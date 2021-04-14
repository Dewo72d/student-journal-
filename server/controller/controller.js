const db = require("../database/database");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/authConfig");
const bcrypt = require("bcrypt");

// Эта функция для проверки типов ну или чего либо.
//Принимает только функции.
//Если условие TRUE выполняется колбек doOnTrue, иначе doOnFalse
function validator(checkFun, doOnTrue, doOnFalse) {
    if (typeof checkFun != "function" || typeof doOnTrue != "function" || typeof doOnFalse != "function") throw new Error("not a function");
    if (checkFun()) {
        return doOnTrue();
    } else {
        return doOnFalse();
    }
}

//---------------------------


//-------Проверка JWT------------
/*
 * Врезультате выполнения этого метода
 * на фронте будет возвращатся страница
 * равная роли или группе
 */
exports.testCookie = (req, res) => {
    jwt.verify(req.cookies.auth, Object.values(jwtSecret)[0], (err, decode) => {
        res.set("Access-Control-Allow-Origin", req.headers.origin); //<<КОСТЫЛЬ!? << ООооХ, эти 2 строки что бы можно было отправлять статус коды.
        res.set("Access-Control-Allow-Credentials", "true");        //<<КОСТЫЛЬ!? << Без них  CORS начитает ругатся, хотя он и без этого рукается.
        if (err || typeof decode === "undefined") {
            return res.status(401).json({message: "Unauthorized"});
        }
        let {group, role} = jwt.decode(req.cookies.auth);
        console.log(group, role);
        return res.status(200).json({group: group, role});
    });
};

//Вход на сайт
exports.login = (req, res) => {
    const {login, password, role} = req.body;
    if (!login || !password) return res.status(401).json(`${new Error("Невірний  логін або пароль")}`);

    db.connection.query(`SELECT * FROM ${role} WHERE login = ${login}`, (err, result) => {
        if (err) return res.status(401).json(
            `${new Error("Невірний  логін або пароль")}`
        );

        let group = result === undefined ? () => {
            return res.status(401).json(`${new Error("Невірний  логін або пароль")}`);
        } : typeof result[0].Group === "undefined" ? "0" : result[0].Group;

        if (result.length === 0) {
            res.status(401).json(
                `${new Error("Невірний  логін або пароль")}`
            );
        } else {
            const hash = (password === result[0].password); // Сравниваем пароли
            if (hash) {
                jwt.sign(
                    {
                        name: result[0].fullName,
                        role: role,
                        group: group
                    },
                    Object.values(jwtSecret)[0],
                    {
                        expiresIn: 60 * 2,
                    },
                    (err, token) => {
                        if (err) throw new Error(err);
                        res.cookie("auth", `${token}`, {httpOnly: true});
                        res.redirect("http://localhost:3000/");// БЕЗ ЭТОГО КУКА НЕ ОТПРАВЛЯЕТСЯ
                    });

            } else {
                return res.status(401).json(
                    `${new Error("Невірний  логін або пароль")}`
                );
            }


        }
    });
};


//----------НУЖЕН РЕФАКТОРИНГ-----НУЖЕН РЕФАКТОРИНГ-----НУЖЕН РЕФАКТОРИНГ----------

//Добавление нового: админа,  препорда
exports.addNewUser = (req, res) => {
    const {fullName, login, password, role} = req.body;


    db.connection.query(`SELECT * FROM ${role} WHERE login = ${login}`, (err, result) => {
        if (result.length > 0) {
            return (
                res.status(401).json(
                    `${new Error("Такий логін вже існує")}`
                )
            );
        } else {
            db.connection.query(`INSERT INTO ${role} (fullName,login, password) VALUES(${fullName}, ${login}, ${password})`);
            /*???????????????????????????*/
        }
    });
};
//Добавление нового старосты
exports.addNewStarosta = (req, res) => {
    const {fullName, group, login, password, role} = req.body;

    db.connection.query(`SELECT * FROM ${role} WHERE login = ${login}`, (err, result) => {
        if (result.length > 0) {
            return (
                res.status(401).json(
                    `${new Error("Такий логін вже існує")}`
                )
            );
        } else {
            db.connection.query(`INSERT INTO ${role} (starostaName, Group, login, password) VALUES(${fullName},${group}, ${login}, ${password})`);
            /*???????????????????????????*/
        }
    });
};

//^^^^^^^^^^НУЖЕН РЕФАКТОРИНГ^^^^^^НУЖЕН РЕФАКТОРИНГ^^^^^^^НУЖЕН РЕФАКТОРИНГ^^^^^^^


//Выборка в админке
exports.selection = (req, res) => {
    let date = validator(() => req.body.month === "true", () => `MONTH(lesson.Date) = MONTH('${req.body.date}')`, () => `lesson.Date = STR_TO_DATE('${req.body.date}', '%Y-%m-%d')`);
    let name = validator(() => req.body.name === "", () => "", () => `AND students.fullName LIKE '%${req.body.name}%'`);
    let group = validator(() => req.body.group === "", () => "", () => `AND students.studentGroup = ${req.body.group}`);
    let lesson = validator(() => req.body.lesson === "0", () => "", () => `AND lesson.lessonNumber = ${req.body.lesson}`);
    let countA = 0;
    let countP = 0;
    //------------------------------
    let sqlQuery = `SELECT students.fullName,students.studentGroup,lesson.lessonNumber,lesson.Date ,lesson.value FROM lesson,students WHERE ${date} AND lesson.studentId = students.id ${lesson} ${group} ${name} `;
    db.connection.query(sqlQuery, (err, result) => {
        if (err) console.log(err);
        // Счеткик присутствующих и отствующих
        for (let i = 0; i < result.length; i++) {
            if (result[i].value === "absent") {
                countA += 1;
            } else if (result[i].value === "present") {
                countP += 1;
            }
        }
        result.push({
            countAbsent: countA,
            countPresent: countP
        });
        //--Последний елемент в масиве всегда будет  объектом с ключами: countAbsent ,countPresent --
        res.send(result);
    });
};

//Добавление новго студента в админке
exports.insertingStudent = (req, res) => {
    const name = req.body.name;
    const group = req.body.group;
    let q = `INSERT INTO students (studentGroup,fullName) VALUES ('${group}','${name}')`;//шукаємо в БД чи є такий студент
    if (name === '' || group === '') {
        res.status(200).json({
            message: "Ви не ввели студента чи групу"
        });
    } else {
        let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//шукаємо в БД чи є такий студент
        db.connection.query(selectName, (err, result) => {
            if (result.length > 0)
                res.status(200).json({
                    message: "Такий студент вже існує"
                });
            else {
                db.connection.query(q, (error, result2) => {//добавляємо в БД на основі вибірки
                    if (error) res.status(500).json({
                        message: `Помилка - ${result2}`,
                    });
                    res.status(200).json({
                        message: "Студента було додано",
                    });
                });
            }
        });
    }
};

//Удаление студенда в админке
exports.deletingStudent = (req, res) => {
    const name = req.body.name;
    const group = req.body.group;
    console.log(group, name);
    if (name.length === 0 || group.length === 0) {
        res.status(200).json({
            message: "Ви не ввели студента чи групу",
        });
    } else {
        let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//шукаємо в БД чи є такий студент
        db.connection.query(selectName, (err, result) => {
            if (result.length === 0) {
                res.status(200).json({
                    message: "Такого студента немає",
                });
            } else {
                let q = `DELETE FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//видаляємо на основі вибірки
                db.connection.query(q, (error, result2) => {
                    if (error) res.status(500).json({
                        message: `Помилка - ${result2}`,
                    });
                    res.status(200).json({
                        message: "Студента було видалено",
                    });
                });
            }
        });
    }
};

//Перевод студентов на новый курс в админке
exports.uppdateStudent = (req, res) => {
    let updateGroup = `UPDATE students SET students.studentGroup = students.studentGroup + 100 WHERE (students.studentGroup + 100) < 500`;
    let selectGroup = `SELECT * FROM students WHERE (studentGroup + 100) > 500`;
    let deleteStudentGroup = `DELETE FROM students WHERE (students.studentGroup + 100) > 500`;
    db.connection.query(selectGroup, (err, result) => {//шукаємо випускників
        if (result.length > 0) {
            db.connection.query(deleteStudentGroup, (err2, result2) => {//видаляємо їх
                if (err2) {
                    console.log(err2);
                    res.status(500).json({
                        message: `Помилка - ${result2}`
                    });
                } else {
                    db.connection.query(updateGroup, (err3, result3) => {//переводимо інших на наступний курс
                        if (err) res.status(500).json({
                            message: `Помилка - ${err3}, \n ${result3}`
                        });
                        else {
                            res.status(200).json({
                                message: "Переведення успішно здійснено"
                            });
                        }
                    });
                }
            });
        }
    });
};

//Добавление нового студента
exports.insertingStudent = (req, res) => {
    const name = req.body.name;
    const group = req.body.group;
    let q = `INSERT INTO students (studentGroup,fullName) VALUES ('${group}','${name}')`;//шукаємо в БД чи є такий студент
    if (name === '' || group === '') {
        res.status(200).json({
            message: "Ви не ввели студента чи групу"
        });
    } else {
        let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//шукаємо в БД чи є такий студент
        db.connection.query(selectName, (err, result) => {
            if (result.length > 0)
                res.status(200).json({
                    message: "Такий студент вже існує"
                });
            else {
                db.connection.query(q, (error, result) => {//добавляємо в БД на основі вибірки
                    if (error) res.status(401).json({
                        message: "Помилка",
                    });
                    res.status(200).json({
                        message: "Студента було додано",
                    });
                });
            }
        });
    }
};
// Ужадение студента
exports.deletingStudent = (req, res) => {
    const name = req.body.name;
    const group = req.body.group;
    console.log(group, name);
    if (name.length === 0 || group.length === 0) {
        res.status(200).json({
            message: "Ви не ввели студента чи групу",
        });
    } else {
        let selectName = `SELECT * FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//шукаємо в БД чи є такий студент
        db.connection.query(selectName, (err, result) => {
            if (result.length === 0) {
                res.status(200).json({
                    message: "Такого студента немає",
                });
            } else {
                let q = `DELETE FROM students WHERE studentGroup = '${group}' AND fullName = '${name}'`;//видаляємо на основі вибірки
                db.connection.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            message: "Помилка",
                        });
                    }
                    res.status(200).json({
                        message: "Студента було видалено",
                    });
                });
            }
        });
    }
};

//Перевод на новый курс
exports.uppdateStudent = (req, res) => {
    let uppdateGroup = `UPDATE students SET students.studentGroup = students.studentGroup + 100 WHERE (students.studentGroup + 100) < 500`;
    let selectGroup = `SELECT * FROM students WHERE (studentGroup + 100) > 500`;
    let deleteStudentGroup = `DELETE FROM students WHERE (students.studentGroup + 100) > 500`;
    db.connection.query(selectGroup, (err, result) => {//шукаємо випускників
        if (result.length > 0) {
            db.connection.query(deleteStudentGroup, (err2, result) => {//видаляємо їх
                if (err2) {
                    console.log(err2);
                    res.status(404).json({
                        message: "Помилка"
                    });
                } else {
                    db.connection.query(uppdateGroup, (err, result) => {//переводимо інших на наступний курс
                        if (err) res.status(404).json({
                            message: "Помилка"
                        });
                        else {
                            res.status(200).json({
                                message: "Переведення успішно здійснено"
                            });
                        }
                    });
                }
            });
        }
    });
};

// Добавлення старости групи
exports.insertingStarosta = (req, res) => {
  const name = req.body.name;
  const group = req.body.group;
  let select_id = `SELECT id FROM students WHERE fullName = '${name}' AND studentGroup = '${group}'`;
  let check = `SELECT * FROM starosta WHERE starostaGroup = '${group}'`;

  if (name.length == 0 || group.length == 0) { 
    res.status(500).json({
      message: "Ви не ввели студента",
    })
  }
  else {
    db.connection.query(check, (err_check, result_check) => { // шукаю чи є такий студент і група
      if (result_check == 0) { // якщо в групі ше немає старости, то добавляю
        db.connection.query(select_id, (error, result_select) => {  // шукаю його id, якщо є такий студент
          if (result_select.length == 0) {
            res.status(500).json({
              message: "Такої групи або студента не існує"
            })
          }
          else {
            let query = `INSERT INTO starosta (starostaName,starostaGroup) VALUES ('${result_select[0].id}','${group}')`; // добавляю старосту в групу
            db.connection.query(query, (err, result) => {
              if (err) {
                res.status(500).json({
                  message: "Помилка"
                })
              }
              else {
                res.status(200).json({
                  message: "Старосту було добавлено"
                })
              }
            })
          }
        }
        )
      }
      else {
        db.connection.query(select_id, (error, result_select) => { // якщо в групі вже є староста
          if (result_select.length == 0) {
            res.status(500).json({
              message: "Такої групи або студента не існує"
            })
          }
          else {
            let query = `UPDATE starosta SET starostaName = '${result_select[0].id}' WHERE starostaGroup IN(SELECT studentGroup FROM students WHERE id = '${result_select[0].id}')`; // обновлюю, старосту групи
            db.connection.query(query, (err, result) => {
              if (err) {
                res.status(500).json({
                  message: "Помилка"
                })
              }
              else {
                res.status(200).json({
                  message: "Старосту було добавлено"
                })
              }
            })
          }
        }
        )
      }
    })
  }
}
//
