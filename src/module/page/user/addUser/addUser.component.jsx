import React from 'react';
import './addUser.style.scss';
import {Link} from 'react-router-dom';

function AddUser(){
    return(
        <div className="add-user">
            <Link to={"/users/add"}>
            <button className="btn-add">ADD USER</button>
            </Link>
        </div>
    )
}

export default AddUser;