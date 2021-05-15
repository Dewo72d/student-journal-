import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    select: {
        [theme.breakpoints.down("sm")]: {
            width: "16em",
            marginBottom: "1em",
        },
        [theme.breakpoints.down("lg")]: {
            marginBottom: "1em",
            width: "18em",
            marginLeft: "1em",
        },
        [theme.breakpoints.down("xs")]: {
            marginLeft: "5px",
            width: "14em",
            "& .MuiSelect-select.MuiSelect-select": {
                fontSize: "14px",
            },
        },
    },
    mark: {
        fontSize: "20px"
    },
    card: {
        [theme.breakpoints.down("xs")]: {
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
                fontSize: 17,
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
                fontSize: 18,
            },
            "& Button": {
                fontSize: 30,
                height: 75,
                padding: "1em"
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
    const {handleSubmit, control } = useForm(); // initialize the hook
    const [valid, setValid] = useState("");
    const [studentsProps, setStudentsProps] = useState([]);
    const [lesson, setLesson] = useState(lessons[0].value);
    const [alertopen, setAlertToOpen] = useState(true);
    const handleClose = () => {
        setAlertToOpen(false);
    }
    useEffect(() => {
        setStudentsProps(prop.studetns);
    }, [prop.studetns]);
    //----------------------

    const onSubmitUpdate = async (dataUpdate) => {
        setAlertToOpen(true);
        setMessage("");
        setValid("");
        // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
        let formData = new FormData();
        let arrData = [];
        console.log(dataUpdate.mark !== 'present' || dataUpdate.mark !== "absent");
        for (let key in dataUpdate) {
            //Валидация входящих данныхlessonUpdate
            if (dataUpdate.mark !== "absent" && dataUpdate.mark !== "present") return setValid(`Помилка, юний хакер > не ламай форму <`);
            if (![1, 2, 3, 4].some(i => i === +(dataUpdate.lessonUpdate))) return setValid(`Помилка, юний хакер`);
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
        <div style={{ padding: "1.5em" }}>
            <form onSubmit={handleSubmit(onSubmitUpdate, onErr)} className={classes.card} style={{ border: "1px solid grey", borderRadius: "1em", padding: "1em" }}>
                <div>
                    <FormLabel style={{ fontSize: "20px"}}>Виправити</FormLabel>
                    <div style={{marginTop: "1em"}}>
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
                    <FormControl>
                        <FormLabel>Відмітка</FormLabel>
                        <Controller
                        as=
                        {
                        <RadioGroup
                            aria-label="gender"
                            style={{ display: "block" }}
                            name="mark"
                        >
                            <FormControlLabel
                                value="present"
                                control={<Radio/>}
                                label="Присутній"
                            />
                            <FormControlLabel
                                value="absent"
                                control={<Radio/>}
                                label="Відсутній"
                            />
                        </RadioGroup>
                        }
                        name="mark"
                        control={control}
                        />
                    </FormControl>
                </div>
                <Button type="submit" color="primary" variant="outlined">Відправити</Button>
            </form>
            {valid !== "" ? <Snackbar open={alertopen} autoHideDuration={6000} onClose={handleClose}>
                <Alert style={{ backgroundColor: "black" }} onClose={handleClose} severity="error">
                    {valid}
                </Alert>
            </Snackbar> : message.message === "Помилка" ? <Snackbar open={alertopen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {message.message}
                </Alert>
            </Snackbar> : message !== "" ? <Snackbar open={alertopen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message.message}
                </Alert>
            </Snackbar> : <div></div>}
        </div>
    );
}

export default FilterForm;
