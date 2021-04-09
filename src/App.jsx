import React from "react";
import admin from "./admin/admin-page";
import loginPage from "./login/login-page/login-page";
import studentPage from "./student/student-page";
import {BrowserRouter, Route} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Route exact path="/auth" component={loginPage}/>
            <Route exact path="/student" component={studentPage}/>
            <Route path="/mypage" component={admin}/>
        </BrowserRouter>
    );
}

export default App;
