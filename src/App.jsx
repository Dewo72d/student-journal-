import React, { useState, useEffect } from "react";
import admin from "./admin/admin-page";
import loginPage from "./login/login-page/login-page";
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Route path="/mypage" component={admin} />
      <Route exact path="/auth" component={loginPage}/>
    </BrowserRouter>
  );
}

export default App;
