import React, {useEffect, useState} from "react";
import {Controller,useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    select:{
      [theme.breakpoints.down("sm")]: {
        width: "20em",
        marginBottom: "1em",
    },
    [theme.breakpoints.down("lg")]: {
        marginBottom: "1em",
        width: "20em",
        marginLeft: "1em"
    },
    [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        marginTop: "1em"
    },
    },
    mark:{
        fontSize: "20px"
    },
    card: {
        [theme.breakpoints.down("xs")]: {
            color: "red",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
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
                fontSize: 20,
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
                fontSize: 30,
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
    const {register, handleSubmit, control} = useForm(); // initialize the hook
    const [valid, setValid] = useState(" ");
    const [studentsProps, setStudentsProps] = useState([]);
    const [lesson, setLesson] = useState(lessons[0].value);
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
                        <FormControl>
                        <InputLabel>
                            Пара
                        </InputLabel>
                        <Controller
                            as={
                                <Select value={lesson} onChange={e => setLesson(e.target.value)}>
                                    {lessons.map((res) => (
                                        <MenuItem key={res.value} value={res.value}>{res.label}</MenuItem>
                                    ))}
                                </Select>
                            }
                            name="lessonUpdate"
                            id="lessonUpdate"
                            defaultValue={lessons[0].value}
                            control={control}
                        />
                    </FormControl>
                    <FormControl className={classes.select}>
                        <InputLabel>
                            Студент
                        </InputLabel>
                        <Controller
                            as={
                                <Select value={studentsProps} onChange={e => setStudentsProps(e.target.value)}>
                                    {studentsProps.map((res) => (
                                        <MenuItem key={res.id} value={res.id}>{res.fullName}</MenuItem>
                                    ))}
                                </Select>
                            }
                            name="student"
                            id="student"
                            control={control}
                            defaultValue=" "
                        />
                    </FormControl>
                    </div>
                    <div className={classes.mark}>
                    <b>Присутній</b>
                    <input type="radio" name="mark" value="present" ref={register}/>
                    <b>Відстуній</b>
                    <input type="radio" name="mark" value="absent" ref={register}/>
                    </div>
                </div>
                <Button className={classes.btn} type="submit" color="primary" variant="outlined">Update</Button>
            </form>
            <h1 onClick={() => setMessage("")}>{message.message}</h1>
        </div>
    );
}

export default FilterForm;
