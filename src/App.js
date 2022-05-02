import {React, useEffect} from 'react';
import './App.css';
import Users from './module/page/userPage/userPage.component';
import Header from './module/header/header.component.jsx';
import AddUserPage from './module/page/addUserPage/addUserPage.component.jsx'
import EditUserPage from './module/page/editUserPage/editUserPage.component.jsx'
import RoomPage from './module/page/roomPage/roomPage.jsx';

import {Routes, Route, Redirect, BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/users" element={<Users/>}></Route>
        <Route exact path="/users/add" element={<AddUserPage/>}></Route>
        <Route path="/users/edit/:id" element={<EditUserPage/>}></Route>
        <Route exact path="/rooms" element={<RoomPage/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
