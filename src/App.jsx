import React, {useEffect, useState} from "react";
import admin from "./admin/admin-page";
import loginPage from "./login/login-page/login-page";
import starosta from "./starosta/starosta-page";
import manager from "./manager/manager-page";
import Teacher from "./prepod/prepod-page";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

function App() {
    let [autorized, setAutorized] = useState({status: "Authorized"});
    let [path, setPath] = useState({path: "/auth"});
    let [groupPrepod, setGroupPrepod] = useState(0);

    useEffect(() => {
        fetch("http://localhost:4000/api/cookie", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: document.cookie,
        }).then(async (res) => {
            const usersData = Object.values(await res.json());
            const role = await usersData[1];
            setGroupPrepod(await usersData[0]);
            await setAutorized({status: res.statusText}); //Установка значения ЗАЛОГИНИЛСЯ/НЕ ЗАЛОГИНИЛСЯ
            await setPath(role === "admin" ? {path: "/mypage"} : role === "starosta" ? {path: "/starosta"} : role === "manager" ? {path: "/manager"} : role === "prepod" ? {path: "/teacher"} : {path: "/auth"}); //ПРОВЕРКА И ВЫДАЧА СТРАНИЧКИ
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
            <Route render={()=> <Teacher groupPrepod={groupPrepod} />} path="/teacher" />
            <Route path="/starosta" component={starosta}/>
            <Route path="/mypage" component={admin}/>
            <Route path="/manager" component={manager}/>
        </BrowserRouter>
    );
}

export default App;
