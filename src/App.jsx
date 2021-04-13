import React, {useEffect, useState} from "react";
import admin from "./admin/admin-page";
import loginPage from "./login/login-page/login-page";
import studentPage from "./student/student-page";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

function App() {
    let [autorized, setAutorized] = useState({status: "Authorized"});
    let [path, setPath] = useState({path: "/auth"});

    useEffect(() => {
        fetch("http://localhost:4000/api/cookie", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: document.cookie,
        }).then(async (res) => {
            const role = Object.values(await res.json())[1];
            await setAutorized({status: res.statusText}); //Установка значения ЗАЛОГИНИЛСЯ/НЕ ЗАЛОГИНИЛСЯ
            await setPath(role === "admin" ? {path: "/mypage"} : role === "starosta" ? {path: "/student"} : {path: "/auth"}); //ПРОВЕРКА И ВЫДАЧА СТРАНИЧКИ
        });
    }, []);

    if (autorized.status === "Unauthorized") {
        return (
            <BrowserRouter>
                <Redirect push to="/auth"/>
                <Route path="/auth" component={loginPage}/>
            </BrowserRouter>);
    }

    return (
        <BrowserRouter>
            <Redirect push to={path.path}/>
            <Route exact path="/auth" component={loginPage}/>
            <Route path="/student" component={studentPage}/>
            <Route path="/mypage" component={admin}/>
        </BrowserRouter>
    );
}

export default App;
