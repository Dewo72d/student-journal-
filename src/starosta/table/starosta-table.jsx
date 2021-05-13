import React, {useEffect, useRef, useState} from "react";

import UpdateForm from "../filter-form/filter-form";
import {useForm} from "react-hook-form";

function StarostaTable(prop) {
    const componentRef = useRef();
    const [valid, setValid] = useState(" ");
    const [result, setResult] = useState([]); //Выборка
    const [message, setMessage] = useState("");//Сообщение о рещьтате добавление отметок
    const {register, handleSubmit} = useForm(); // initialize the hook

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

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitMark, onErr)} id="starostaForm" name="starostaForm">
                {result.map((i) => {
                    return (
                        <div key={Math.random()}>
                            <hr/>
                            <h3>№{i.id} {i.fullName}</h3>
                            <b>Присутній</b>
                            <input type="radio" name={i.id} value="present" ref={register}/>
                            <b>Відстуній</b>
                            <input type="radio" name={i.id} value="absent" ref={register}/>
                            <hr/>
                        </div>
                    );
                })}
                <select name="lesson" ref={register}>
                    {lessons.map((val) => (
                        <option key={val.value} value={val.value}>
                            {val.label}
                        </option>
                    ))}
                </select>
                <button type="submit" form="starostaForm">Відправити</button>
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
