import React, {useEffect, useState} from "react";
import admin from "./admin/admin-page";
import loginPage from "./login/login-page/login-page";
<<<<<<< Updated upstream
import starosta from "./starosta/starosta-page";
=======
import Starosta from "./starosta/starosta-page";
import manager from "./manager/manager-page";
import Teacher from "./prepod/prepod-page";
>>>>>>> Stashed changes
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import { Paper } from "@material-ui/core";
function App() {
    let [autorized, setAutorized] = useState({status: "Authorized"});
    let [path, setPath] = useState({path: "/auth"});
<<<<<<< Updated upstream

=======
    let [group, setGroup] = useState(0);
>>>>>>> Stashed changes
    useEffect(() => {
        fetch("http://localhost:4000/api/cookie", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: document.cookie,
        }).then(async (res) => {
<<<<<<< Updated upstream
            const role = Object.values(await res.json())[1];
            console.log(res.cookie);
=======
            debugger;
            const usersData = Object.values(await res.json());
            const role = await usersData[1];
            setGroup(await usersData[0]);
            await console.log(role);
>>>>>>> Stashed changes
            await setAutorized({status: res.statusText}); //Установка значения ЗАЛОГИНИЛСЯ/НЕ ЗАЛОГИНИЛСЯ
            await setPath(role === "admin" ? {path: "/mypage"} : role === "starosta" ? {path: "/starosta"} : {path: "/auth"}); //ПРОВЕРКА И ВЫДАЧА СТРАНИЧКИ
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
        <Paper>
            <Redirect push to={path.path}/>
<<<<<<< Updated upstream
            <Route exact path="/auth" component={loginPage}/>
            <Route path="/starosta" component={starosta}/>
            <Route path="/mypage" component={admin}/>
=======
            <Route render={()=> <Teacher  groupPrepod={group} />} path="/teacher" />
            <Route render={()=> <Starosta groupStarosta={group} />} path="/starosta" />
            <Route path="/mypage" component={admin}/>
            <Route path="/manager" component={manager}/>
        </Paper>
>>>>>>> Stashed changes
        </BrowserRouter>
    );
}

export default App;
