import React, {useEffect,useState} from "react";
import UpdateForm from "../filter-form/filter-form";
import {Controller, useForm} from "react-hook-form";
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
const useStyles = makeStyles({
    btn:{
        marginBottom: "1em",
        marginTop: "1em",
        marginLeft: "1em"
    },
    mark:{
        fontSize: "20px"
    }
})
function StarostaTable(prop) {
    const [valid, setValid] = useState(" ");
    const [result, setResult] = useState([]); //Выборка
    const [message, setMessage] = useState("");//Сообщение о рещьтате добавление отметок
    const {register, handleSubmit,control} = useForm(); // initialize the hook

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
        // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
        let formData = new FormData();
        let arrData = [];
        for (let key in data) {
            if (data[key] !== "absent" && data[key] !== "present" && ![1, 2, 3, 4].some(i => i === +(data.lesson))) return setValid(`Помилка, юний хакер > ${data[key]} <`);
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
            })
            .catch((err) => {
                console.log(err);
            }, []);

    };

    const onErr = (err) => console.error(err);
const classes = useStyles();
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitMark, onErr)} id="starostaForm" name="starostaForm">
                {result.map((i) => {
                    return (
                        <div key={Math.random()}>
                            <hr/>
                            <h3>№{i.id} {i.fullName}</h3>
                            <label>Присутній</label>
                            <input type="radio" name={i.id} value="present" ref={register}/>
                            <label>Відсутній</label>
                            <input type="radio" name={i.id} value="absent" ref={register}/>
                            <hr/>
                        </div>
                    );
                })}
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
            Нажмите на текст что бы убрать
            <h1 onClick={() => setMessage("")}>{message.message}</h1>
            <h1 onClick={() => setValid(null)}>{valid}</h1>
            <hr/>
            <div>
                <UpdateForm studetns={result} group={prop.group}/>
            </div>
        </div>
    );
}

export default StarostaTable;
