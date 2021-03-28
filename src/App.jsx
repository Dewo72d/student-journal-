import React, { useState, useEffect } from "react";
import admin from "./admin/admin-page";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/mypage" component={admin} />
    </BrowserRouter>
  );
}

export default App;
