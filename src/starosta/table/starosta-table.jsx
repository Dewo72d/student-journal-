import React, { useEffect, useState } from "react";
import UpdateForm from "../filter-form/filter-form";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, Snackbar } from "@material-ui/core";
import { Alert} from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
    btn: {
        marginBottom: "1em",
        marginTop: "1em",
        marginLeft: "1em"
    },
    mark: {
        fontSize: "20px",
    },
    greed:{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "repeat(3,120px)",
        marginTop: "2em",
        [theme.breakpoints.down("xs")]: {
            gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateRows: "repeat(4,140px)",
        },
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "repeat(3,140px)",
        },
    },
    label:{
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
            marginRight: "1em"
        },
    },
    radioLabel:{
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    radioBtn:{
        [theme.breakpoints.down("xs")]:{
            transform: "scale(0.7)"
        }
    }
}));
function StarostaTable(prop) {
    const [valid, setValid] = useState("");
    const [result, setResult] = useState([]); //Выборка
    const [message, setMessage] = useState("");//Сообщение о рещьтате добавление отметок
    const { register, handleSubmit, control } = useForm(); // initialize the hook

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
    const [lesson, setLesson] = useState(lessons[0].value);
    const [alertopen, setAlertOpen] = useState(true);
    const handleClose = () => {
        setAlertOpen(false);
    }
    //Перерисовка на основе выборки
    useEffect(() => {
        fetch("http://localhost:4000/api/setstudents", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: document.cookie,
        }).then(async (res) => {
            return await res.json();
        })
            .then((res) => {
                return setResult(res);
            });
    }, []);
    const onSubmitMark = async (data) => {
        setAlertOpen(true);
        setValid("");
        setMessage("");
        // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
        let formData = new FormData();
        let arrData = [];
        for (let key in data) {
            console.log(data[key]);
            if (data[key] !== "absent" && data[key] !== "present" && ![1, 2, 3, 4].some(i => i === +(data.lesson))) return setValid(`Помилка, не ламай форму`);
            if (data[key] === null) return setValid("ПОМИЛКА");
            arrData.push(`{"${String(key)}": "${String(data[key])}"}`);
        }
        arrData.push(`{"group": "${prop.group}"}`);
        formData.append('students', `[${arrData}]`);
        //Отправка формы в бд на выборку
        await fetch("http://localhost:4000/api/marking", {
            method: "POST",
            mode: "cors",
            body: formData,
        })
            .then(async (res) => {
                setMessage(await res.json());
                handleSubmit("");
            })
            .catch((err) => {
                console.log(err);
            }, []);

    };

    const onErr = (err) => console.error(err);
    const classes = useStyles();
    return (
        <div style={{ border: "1px solid blue", borderRadius: "1em" }}>
            <form onSubmit={handleSubmit(onSubmitMark, onErr)} id="starostaForm" name="starostaForm" style={{ padding: "1em" }}>
                <div className={classes.greed}>
                {result.map((i) => {
                    return (
                        <div key={Math.random()}>
                            <FormControl>
                                <FormLabel className={classes.label}>#{i.id} {i.fullName}</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name={i.id}
                                    className={classes.radioBtn}
                                >
                                    <FormControlLabel
                                        value="present"
                                        control={<Radio inputRef={register} />}
                                        label={<span className={classes.radioLabel}>Присутній</span>}
                                    />
                                    <FormControlLabel                            
                                        value="absent"
                                        control={<Radio inputRef={register} />}
                                        label={<span className={classes.radioLabel}>Відсутній</span>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    );
                })}
                </div>
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
                        name="lesson"
                        id="lesson"
                        defaultValue={lessons[0].value}
                        control={control}
                    />
                </FormControl>
                <Button className={classes.btn} type="submit" color="primary" variant="outlined" form="starostaForm">Відправити</Button>
            </form>
            {/* Нажмите на текст что бы убрать
            <h1 onClick={() => setMessage("")}>{message.message}</h1>
            <h1 onClick={() => setValid(null)}>{valid}</h1> */}
            {valid !== "" ? <Snackbar  open={alertopen} autoHideDuration={6000} onClose={handleClose}>
                <Alert style={{backgroundColor: "black"}} onClose={handleClose} severity="error">
                    {valid}
                </Alert>
            </Snackbar> : message.message === "Помилка - Ви вже відправляли відміткі" ? <Snackbar open={alertopen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {message.message}
                </Alert>
            </Snackbar> : message !== "" ? <Snackbar open={alertopen} autoHideDuration={6000} onClose={handleClose}>
                <Alert  onClose={handleClose} severity="success">
                    {message.message}
                </Alert>
            </Snackbar> : <div></div>}
            <hr />
            <div>
                <UpdateForm studetns={result} group={prop.group} />
            </div>
        </div>
    );
}

export default StarostaTable;
