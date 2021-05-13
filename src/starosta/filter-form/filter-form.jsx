import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import StarostaTable from "../table/starosta-table";
import {FormControlLabel, Input} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            "& .MuiOutlinedInput-input": {
                fontSize: 16,
                marginBottom: 10,
            },
            "& Button": {
                fontSize: 20,
            },
        },

        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            "& .MuiOutlinedInput-input": {
                fontSize: 18,
                hight: 20,
                marginTop: 10
            },
            "& input#date": {
                marginTop: 10,
            },
            "& Button": {
                fontSize: 10,
                marginTop: 10
            },
        },

        [theme.breakpoints.up("md")]: {
            display: "flex",
            justifyContent: "space-between",
            "& #name": {
                width: "20rem",
            },
        },

        [theme.breakpoints.up("lg")]: {
            justifyContent: "space-evently",
            "& .MuiOutlinedInput-input": {
                fontSize: 20,
            },
            "& Button": {
                fontSize: 20,
                height: 75,
            },
            "& #name": {
                width: "25rem",
            },
        },
    },
}));

const lessons = [
    {
        value: "1",
        label: "1",
    },
    {
        value: "2",
        label: "2",
    },
    {
        value: "3",
        label: "3",
    },
    {
        value: "4",
        label: "4",
    },
];

function FilterForm(prop) {
    const [message, setMessage] = useState("");//Сообщение о рещьтате добавление отметок
    const classes = useStyles();
    const {register, handleSubmit} = useForm(); // initialize the hook
    const [valid, setValid] = useState(" ");
    const [studentsProps, setStudentsProps] = useState([]);
    const [lesson, setLesson] = useState(lessons[0].value);
    const [selection, setSelection] = useState([]);
    const hendleChange = (event) => {
        setLesson(event.target.value);
    };

    useEffect(() => {
        setStudentsProps(prop.studetns);
    }, [prop.studetns]);
    //----------------------

    const onSubmitUpdate = async (dataUpdate) => {
        // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
        let formData = new FormData();
        let arrData = [];
        console.log(dataUpdate.mark !== 'present'|| dataUpdate.mark !== "absent");
        for (let key in dataUpdate) {
            //Валидация входящих данныхlessonUpdate
            if(dataUpdate.mark !== "absent" && dataUpdate.mark !== "present") return setValid(`Помилка, юний хакер > не ламай форму <`);
            if (![1, 2, 3, 4].some(i => i === +(dataUpdate.lessonUpdate))) return setValid(`Помилка, юний хакер > ${dataUpdate[key]} <`);
            if (dataUpdate[key] === null) return setValid("ПОМИЛКА");
            arrData.push(`{"${String(key)}": "${String(dataUpdate[key])}"}`);
        }
        arrData.push(`{"group": "${prop.group}"}`);
        formData.append('students', `[${arrData}]`);
        //Отправка формы в бд на выборку
        await fetch("http://localhost:4000/api/updatemark", {
            method: "POST",
            mode: "cors",
            body: formData,
        })
            .then(async (res) => {
                 setMessage(await res.json());
            })
            .catch((err) => {
                console.log(err);
            }, []);
    };
    //--------------------------------
    const onErr = (err) => console.error(err);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitUpdate, onErr)} className={classes.card}>
                <div>
                    <h2>Виправити</h2>
                    <div>
                        <h1>{valid}</h1>
                        <label>Пара</label>
                        <select name="lessonUpdate" ref={register}>
                            {lessons.map((val) => (
                                <option key={val.value} value={val.value}>
                                    {val.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <b>Cтудент</b>
                    <select name="student" ref={register}>
                        {studentsProps.map((val) => (
                            <option key={val.id} value={val.id}>
                                {val.fullName}
                            </option>
                        ))}
                    </select>
                    <b>Присутній</b>
                    <input type="radio" name="mark" value="present" ref={register}/>
                    <b>Відстуній</b>
                    <input type="radio" name="mark" value="absent" ref={register}/>
                </div>
                <button>UPDATE</button>
            </form>
            <h1 onClick={() => setMessage("")}>{message.message}</h1>
        </div>
    );
}

export default FilterForm;
