import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import PrepodTable from "../table/prepod-table";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControl, FormControlLabel,InputLabel, MenuItem,Select, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        [theme.breakpoints.up("xs")]: {
            textAlign: "center",
            "& .MuiFormControl-root": {
                marginBottom: "1em",
            },
            "& Button":{
                marginBottom: "1em"
            }
        },
        [theme.breakpoints.up("sm")]: {
            alignItems: "center",
            display: "flex",
            flexWrap:"wrap",
            justifyContent: "space-between",
            "& #name": {
                width: "16rem",
            },
            "& #group":{
                width: "2rem",
            },
            "& .MuiInputBase-input":{
                fontSize: "13px",
                height: "2.1876em",
            },
            "& .MuiTypography-body1":{
                fontSize: "12px",
            },
            "& input#date":{
                padding: "20px 12px 10px",
            },
            "& Button":{
                fontSize: "13px",
            },
            "& .MuiFormLabel-root":{
                fontSise: "11px",
            },
            "& .MuiFormControl-root":{
                marginBottom: "1em"
            }
        },
        
        [theme.breakpoints.up("md")]: {
            display: "flex",
            justifyContent: "space-between",
            "& #name": {
                width: "20rem",
            },
            "& #group":{
                width: "4rem",
            },
            "& .MuiInputBase-input":{
                fontSize: "17px",
                height: "2.1876em",
            },
            "& .MuiTypography-body1":{
                fontSize: "12px",
            },
            "& input#date":{
                padding: "20px 12px 10px",
            },
        },
        
        [theme.breakpoints.up("lg")]: {
            justifyContent: "space-evently!",
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
    image: {
        width: "20px",
    },
}));
const lessons = [
    {
        value: "0",
        label: "Всі",
    },
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

function PrepodFilterForm(props) {
    debugger;
    const componentRef = useRef();
    const classes = useStyles();
    const { register, handleSubmit, control } = useForm(); // initialize the hook
    const [selection, setSelection] = useState([]);
    const [lessonData, setLessons] = useState([]);
    const [group,setGroup] = useState([]);
    const handleLesson = (e) => {
        setLessons(e.target.value);
        console.log(e);
    }
    const onSubmit = async (data) => {
        // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
            console.log(data);
        }
        //----Отправка формы в бд на выборку------
        await fetch("http://localhost:4000/api/selection", {
            method: "POST",
            mode: "cors",
            body: formData,
        })
            .then(async (res) => {
                return await res.json();
            })
            .then(async (res) => {
                return await setSelection(res);
            })
            .catch((err) => {
                console.log(err);
            }, []);
    };
    useEffect(() => {
        setGroup(props.groupPrepod)
    }, [props]);
    //--------------------------------
    const onErr = (err) => console.error(err);

    return (
        <div>
            <div ref={componentRef}>
                <PrepodTable selection={selection} />
            </div>
            <form  onSubmit={handleSubmit(onSubmit, onErr)} className={classes.card}>
            <div>
                    <TextField
                        inputRef={register}
                        id="group"
                        type="number"
                        name="group"
                        value={group}
                    />
                </div>
                <div>
                    <TextField
                        inputRef={register}
                        id="name"
                        type="text"
                        name="name"
                        label="ПІП"
                    />
                </div>
                <div>
                    <FormControl>
                        <InputLabel>
                            Пара
                        </InputLabel>
                        <Controller
                            as={
                                <Select value={lessonData} onChange={handleLesson}>
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
                </div>
                <div>
                    <TextField
                        inputRef={register}
                        id="date"
                        label="Дата"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        type="date"
                        name="date"
                    />
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="month"
                                color="primary"
                                inputRef={register}
                                defaultValue={false}
                            />
                        }
                        label="Тільки за місяць"
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    Відправити
                </Button>
            </form>
        </div>
    );
}

export default PrepodFilterForm;
