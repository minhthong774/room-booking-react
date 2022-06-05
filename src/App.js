import React, { useState, useEffect } from "react";
import "./App.css";
import Users from "./module/page/user/userPage/userPage.component.jsx";
import Header from "./module/header/header.component.jsx";
import AddUserPage from "./module/page/user/addUserPage/addUserPage.component.jsx";
import EditUserPage from "./module/page/user/editUserPage/editUserPage.component.jsx";
import RoomPage from "./module/page/room/roomPage/roomPage.component.jsx";
import BookingPage from "./module/page/booking/bookingPage/bookingPage.component.jsx";
import StatisticPage from "./module/page/stats/statisticPage/statisticPage.component.jsx";
import Login from "./module/page/login/login.component";
import axios from "axios";
import useToken from './module/token/useToken.jsx'

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

axios.defaults.withCredentials = true; 

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  } 

  return (
    <div>
      <Router>
        <Header token={token}/>
        <Routes>
          <Route exact path="/users" element={<Users />}></Route>
          <Route exact path="/users/add" element={<AddUserPage />}></Route>
          <Route path="/users/edit/:id" element={<EditUserPage />}></Route>
          <Route exact path="/rooms" element={<RoomPage />}></Route>
          <Route exact path="/bookings" element={<BookingPage />}></Route>
          <Route exact path="/stats" element={<StatisticPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
